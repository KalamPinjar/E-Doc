/*
  Warnings:

  - You are about to drop the column `fileId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
