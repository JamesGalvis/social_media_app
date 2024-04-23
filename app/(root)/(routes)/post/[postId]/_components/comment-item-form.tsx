"use client";

import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditCommentSchema } from "@/schemas";
import { editComment } from "@/actions/comment-service";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CommentExtended } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { multiFormatDateString } from "@/lib/format-date";

interface CommentItemFormProps {
  initialData: CommentExtended;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function CommentItemForm({
  initialData,
  isEditing,
  setIsEditing,
}: CommentItemFormProps) {
  const form = useForm<z.infer<typeof EditCommentSchema>>({
    resolver: zodResolver(EditCommentSchema),
    defaultValues: {
      body: initialData.body || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    if (!isEditing) {
      form.reset();
    }
    setIsEditing(false);
  };

  const handleSubmit = async (values: z.infer<typeof EditCommentSchema>) => {
    try {
      const { error, success, data } = await editComment({
        authorId: initialData.userId,
        commentId: initialData.id,
        values,
      });

      if (error) {
        form.reset();
        toast.error(error);
      }

      if (success && data.comment.body) {
        form.resetField("body", {
          defaultValue: data.comment.body,
        });
        toast.success(success);
      }

      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <p className="text-base text-accent-foreground/70 py-2">
            {initialData.body}
          </p>
          <p className="text-[13px] font-normal text-primary/45">
            Published: {multiFormatDateString(initialData.createdAt)}
          </p>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col pt-3.5 pb-2"
            >
              <FormField
                name="body"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex-1 flex items-center justify-end gap-2 py-2 z-50">
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  disabled={isSubmitting || !isValid}
                  className="hover:text-emerald-400 hover:bg-emerald-500/30"
                >
                  {isSubmitting && (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  )}
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={toggleEdit}
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:bg-rose-500/30 hover:text-rose-500"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
