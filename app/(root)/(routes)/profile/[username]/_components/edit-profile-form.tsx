"use client";

import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditProfileSchema } from "@/schemas";
import { User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { editProfile, updateProfileImage } from "@/actions/profile-service";

interface EditProfileFormProps {
  firstName: string | null;
  lastName: string | null;
  user: User;
  onOpen: (open: boolean) => void;
}

export function EditProfileForm({
  user,
  firstName,
  lastName,
  onOpen,
}: EditProfileFormProps) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    try {
      let newImageUrl = user.imageUrl;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const { error, imageUrl, success } = await updateProfileImage(formData);

        if (success && imageUrl) {
          newImageUrl = imageUrl;
        }

        if (error) {
          form.reset();
          toast.error(error);
        }
      }

      const { error, success, data } = await editProfile(values, newImageUrl);

      if (success && data) {
        toast.success(success);
        router.push(`/profile/${data.username}`);
        onOpen(false);
      }

      if (error) {
        form.reset();
        toast.error(error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="w-[140px] h-[140px] mx-auto rounded-full border mb-3">
            <label
              htmlFor="fileInput"
              className="relative flex items-center justify-center w-full h-full rounded-full cursor-pointer"
            >
              <input
                id="fileInput"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              {user?.imageUrl && !imageSrc && (
                <Image
                  src={user.imageUrl}
                  alt="image file selected"
                  quality={60}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full rounded-full"
                />
              )}
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="image file selected"
                  quality={60}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full rounded-full"
                />
              )}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give a brief description of yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Button type="submit" disabled={isSubmitting || !isValid}>
            <Loader2
              className={cn(
                "h-4 w-4 mr-2 animate-spin",
                !isSubmitting && "hidden"
              )}
            />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
