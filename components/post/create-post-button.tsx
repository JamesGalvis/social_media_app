"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/components/post-form";

export function CreatePostButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-ms:absolute bottom-6 right-4 ms:w-full text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 ms:rounded-md rounded-full max-ms:h-14 max-ms:w-14 transition">
          <span className="max-xl:hidden">Post</span>
          <PlusCircle className="xl:hidden h-[26px] w-[26px]" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 rounded-lg">
        <PostForm
          imageInputId="dialogFile"
          imageStyles="max-h-[370px] overflow-hidden rounded-lg"
          className="border-b-0 p-5"
          onOpen={(value: boolean) => {
            setOpen(value);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
