"use server";

import * as z from "zod";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { EditProfileSchema } from "@/schemas";
import { getUserById, getUserByUsername } from "@/actions/user-service";
import { db } from "@/lib/db";

export const updateProfileImage = async (formData: FormData) => {
  const { userId } = auth();
  const image = formData.get("image");

  if (!userId) {
    return { error: "You must be logged in to change your profile picture" };
  }

  if (!image) {
    return { error: "You must provide the image" };
  }

  const imageBlob = image instanceof Blob ? image : new Blob([image]);

  try {
    const { imageUrl } = await clerkClient.users.updateUserProfileImage(
      userId,
      {
        file: imageBlob,
      }
    );

    return { success: "Profile image updated", imageUrl };
  } catch (error) {
    return { error: "Something went wrong updating the profile image" };
  }
};

export const editProfile = async (
  values: z.infer<typeof EditProfileSchema>,
  imageUrl: string | null
) => {
  try {
    const self = await currentUser();
    const validatedFields = EditProfileSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { firstName, lastName, username, bio } = validatedFields.data;

    if (!self) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById({ id: self.id, type: "Normal" });

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    if (username && username !== self.username) {
      const existingUser = await getUserByUsername(username);

      if (existingUser) {
        return { error: `Username ${existingUser.username} already exists.` };
      }
    }

    const params = {
      firstName: firstName,
      lastName: lastName,
      username: username,
    };

    await clerkClient.users.updateUser(self.id, params);

    const user = await db.user.update({
      where: {
        externalUserId: self.id,
      },
      data: {
        name: `${firstName} ${lastName}`,
        username,
        bio,
        imageUrl,
      },
    });

    revalidatePath("/");
    return { success: "Profile updated", data: user };
  } catch (error) {
    revalidatePath("/");
    return { error: "Something went wrong!" };
  }
};
