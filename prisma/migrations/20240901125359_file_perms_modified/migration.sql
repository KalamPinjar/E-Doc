/*
  Warnings:

  - Added the required column `fileId` to the `FilePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilePermission" ADD COLUMN     "fileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FilePermission" ADD CONSTRAINT "FilePermission_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
