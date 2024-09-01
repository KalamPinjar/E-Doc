-- CreateTable
CREATE TABLE "FilePermission" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "allowedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilePermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FilePermission" ADD CONSTRAINT "FilePermission_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilePermission" ADD CONSTRAINT "FilePermission_allowedUserId_fkey" FOREIGN KEY ("allowedUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
