"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "./edit-profile-form";
import { UserExtended } from "@/types";

interface EditProfileButtonProps {
  firstName: string | null;
  lastName: string | null;
  user: UserExtended;
}

export function EditProfileButton({
  firstName,
  lastName,
  user,
}: EditProfileButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-accent/80 hover:bg-accent">
          <span className="max-ms:hidden">Edit</span>
          <Pencil className="ms:hidden h-5 w-5" />
        </Button>
      </DialogTrigger>
      {/* TODO: Customizar la barra de desplazamiento cuando tenga un overflow */}
      <DialogContent className="sm:max-w-[425px] max-h-[98%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm
          firstName={firstName}
          lastName={lastName}
          user={user}
          onOpen={(value: boolean) => {
            setOpen(value);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
