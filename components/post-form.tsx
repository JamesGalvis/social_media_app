"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { PostSchema } from "@/schemas";
import { deleteImageFile, uploadFiles } from "@/actions/uploadthing-actions";
import { createPost } from "@/actions/post-service";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/user-avatar";
import { Input } from "@/components/ui/input";
import { PostImage } from "@/components/post/post-image";

interface PostFormProps {
  imageInputId: string;
  imageStyles?: string;
  className?: string;
  onOpen?: (open: boolean) => void;
}

export function PostForm({
  imageInputId,
  className,
  imageStyles,
  onOpen,
}: PostFormProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: "",
      imageUrl: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { setValue, getValues, reset, register, watch } = form;

  const watchedCaption = watch("caption");

  const handleSubmite = (formData: FormData) => {
    if (imageSrc) {
      startTransition(async () => {
        const response = await uploadFiles(formData);

        if (response?.success && response.data) {
          setValue("imageUrl", response.data.url);
          const { error, success } = await createPost(getValues());

          if (error) {
            reset();
            setImageSrc(null);
            await deleteImageFile(response.data?.url);
            toast.error(error);
          }

          if (success) {
            reset();
            setImageSrc(null);
            if (onOpen) onOpen(false);
            toast.success(success);
          }
        }

        if (!response?.success) {
          toast.error("Post creation failed");
        }
      });
    }

    if (!imageSrc && watchedCaption) {
      startTransition(async () => {
        const { error, success } = await createPost(getValues());

        if (error) {
          toast.error(error);
        }

        if (success) {
          reset();
          if (onOpen) onOpen(false);
          toast.success(success);
        }
      });
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // Verificar el tamaño del archivo (en bytes)
      const maxSizeInBytes = 1 * 1024 * 1024; // 4MB
      if (file.size > maxSizeInBytes) {
        // El archivo excede el tamaño permitido
        setImageSrc(null);
        toast.error(
          "The selected image exceeds the maximum allowed size of 1MB."
        );
        return;
      }

      // Crear una URL para el archivo seleccionado
      const src = URL.createObjectURL(file);

      setImageSrc(src);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start ms:px-5 px-4 ms:pt-5 pt-3 pb-3 ms:gap-3 gap-2 border-b",
        className
      )}
    >
      <div className="pt-2">
        <UserAvatar src={user?.imageUrl} size="md" />
      </div>

      <form action={handleSubmite} className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-3">
          <Input
            placeholder="What's going on?!"
            className="text-xl border-none w-full h-16 focus-visible:ring-0 focus-visible:ring-transparent"
            autoComplete="off"
            disabled={isPending || isSubmitting}
            {...register("caption")}
          />
          {imageSrc && (
            <div className={cn(imageStyles)}>
              <PostImage
                imageSrc={imageSrc}
                showClose
                onClose={() => {
                  setImageSrc(null);
                }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full">
          <label
            htmlFor={imageInputId}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <input
              id={imageInputId}
              disabled={isSubmitting || isPending}
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            <div className="flex justify-center items-center rounded-full p-2 hover:bg-accent transition">
              <ImagePlus
                className={cn(
                  "h-6 w-6 dark:text-neutral-300 text-neutral-600",
                  isSubmitting ||
                    (isPending &&
                      "dark:text-neutral-300/80 text-neutral-600/80")
                )}
              />
            </div>
          </label>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              isPending ||
              (watchedCaption?.trim().length === 0 && !imageSrc)
            }
            className="ml-auto rounded-full sm:px-7 px-5 text-base font-semibold"
          >
            {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
