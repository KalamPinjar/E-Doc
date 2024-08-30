
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    console.error("No userId found in auth.");
    return null;
  }
  const profile = await db.user.findUnique({
    where: { userId },
  });
  if (!profile) {
    console.error(`No profile found for userId: ${userId}`);
  }
  return profile;
};

