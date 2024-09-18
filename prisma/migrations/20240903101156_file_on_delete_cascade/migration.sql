-- DropForeignKey
ALTER TABLE "FilePermission" DROP CONSTRAINT "FilePermission_fileId_fkey";

-- AddForeignKey
ALTER TABLE "FilePermission" ADD CONSTRAINT "FilePermission_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
