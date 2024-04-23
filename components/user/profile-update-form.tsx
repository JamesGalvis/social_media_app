"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/user-service";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

function ProfileUpdateForm() {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      toast.promise(updateProfile(formData), {
        loading: "Loading...",
        success: (data) => {
          return `${data.success}`;
        },
        error: "Something went wrong",
      });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <Button type="submit" disabled={!file}>
        Save changes
      </Button>
    </form>
  );
}

export default ProfileUpdateForm;
