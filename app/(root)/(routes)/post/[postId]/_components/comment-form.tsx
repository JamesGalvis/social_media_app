"use client";

import * as z from "zod";
import { ChangeEvent, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { CommentSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { PostImage } from "@/components/post/post-image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user/user-avatar";
import { createComment } from "@/actions/comment-service";
import { uploadFiles } from "@/actions/uploadthing-actions";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: "",
      imageUrl: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { setValue, getValues, reset, register, watch } = form;

  const watchedCaption = watch("body");

  const handleSubmit = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        startTransition(async () => {
          const response = await uploadFiles(formData);

          if (response?.success && response.data) {
            setValue("imageUrl", response.data.url);
            const { error, success } = await createComment({
              values: getValues(),
              postId: postId,
            });

            if (error) {
              toast.error(error);
            }

            if (success) {
              reset();
              setImageSrc(null);
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
          const { error, success } = await createComment({
            values: getValues(),
            postId: postId,
          });

          if (error) {
            toast.error(error);
          }

          if (success) {
            reset();
            toast.success(success);
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024; // 4MB
      if (file.size > maxSizeInBytes) {
        setImageSrc(null);
        toast.error(
          "The selected image exceeds the maximum allowed size of 1MB."
        );
        return;
      }

      setFile(file);

      const src = URL.createObjectURL(file);

      setImageSrc(src);
    }
  };

  return (
    <div className="flex items-start ms:px-5 px-4 py-3 gap-1 border-b">
      <div className="pt-2">
        <UserAvatar src={user?.imageUrl} size="default" />
      </div>

      <form action={handleSubmit} className="flex flex-col gap-1 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center w-full">
            <Input
              placeholder="Write your comment..."
              className="text-lg border-none w-full h-16 focus-visible:ring-0 focus-visible:ring-transparent"
              autoComplete="off"
              disabled={isPending || isSubmitting}
              {...register("body")}
            />
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                isPending ||
                (watchedCaption?.trim().length === 0 && !imageSrc)
              }
              className="max-ms:hidden ml-auto rounded-full max-ms:px-2 px-4 max-ms:text-xs text-sm font-semibold"
            >
              {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
              Comment
            </Button>
          </div>
          {imageSrc && (
            <PostImage
              imageSrc={imageSrc}
              showClose
              onClose={() => {
                setImageSrc(null);
              }}
            />
          )}
        </div>

        <div className="flex w-full">
          <label
            htmlFor="file"
            className="relative flex items-center justify-center cursor-pointer"
          >
            <input
              id="file"
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
            className="ms:hidden ml-auto rounded-full px-4 text-[13px] font-semibold"
          >
            {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
}
