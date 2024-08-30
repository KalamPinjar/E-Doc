import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export const initialUser = async () => {
  try {
    const Currentuser = await currentUser();
    if (!Currentuser) {
      console.error("No current user found.");
      return redirect("/sign-in");
    }

    const user = await db.user.findUnique({
      where: {
        userId: Currentuser.id,
      },
    });

    if (!user) {
      // Create a new user profile if not found
      const newUser = await db.user.create({
        data: {
          userId: Currentuser.id,
          email: Currentuser.emailAddresses[0]?.emailAddress,
        },
      });

      return newUser;
    }
  } catch (error) {
    console.error("Error in initialUser function:", error);
    throw new Error("Failed to initialize user.");
  }
};
