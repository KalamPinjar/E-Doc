/*
  Warnings:

  - Added the required column `fileKey` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileKey" TEXT NOT NULL;
