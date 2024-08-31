import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/db"; // Path to your Prisma client
import { currentProfile } from "@/lib/current-profile";

const f = createUploadthing();
const auth = async (req: Request): Promise<{ id?: string }> => {
  const profile = await currentProfile();
  return profile?.userId ? { id: profile.userId } : {};
};

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata;
      if (!userId) {
        console.error("No userId found in metadata.");
        throw new Error("No userId provided.");
      }

      try {
        console.log("Upload complete for userId:", userId);
        console.log("file url", file.url);
        console.log("Looking for user with userId:", userId);
        // Verify that the user exists
        const user = await db.user.findUnique({
          where: { userId },
        });

        if (!user) {
          console.error(
            `User with userId ${userId} not found in the database.`
          );
          throw new Error("User not found");
        }

        // Save the file details in the database
        await db.file.create({
          data: {
            name: file.name,
            url: file.url,
            fileId: userId,
            fileKey: file.key,
          },
        });

        console.log("File saved successfully");
      } catch (error) {
        console.error("Error saving file:", error);
      }
      return { uploadedBy: userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
// eslint-disable-next-line no-unused-vars
