"use client";
import * as React from "react";
import { File as PrismaFile } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type SharedFile = PrismaFile & {
  sharedBy: string;
};

export function SharedFiles() {
  const [sharedFiles, setSharedFiles] = React.useState<SharedFile[]>([]);

  React.useEffect(() => {
    // Fetch files shared with the current user
    const fetchSharedFiles = async () => {
      const response = await fetch("/api/permissions/sharedFiles");
      if (!response.ok) {
        console.error("Failed to fetch shared files");
        return;
      }
      const data: SharedFile[] = await response.json();
      setSharedFiles(data);
    };

    fetchSharedFiles();
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-10 md:mt-5 lg:mt-0">
      <h2 className="font-bold text-black text-center text-xl dark:text-white">
        Files Shared with You
      </h2>
      {sharedFiles.length === 0 ? (
        <p className="w-fit text-black/70 text-center dark:text-white">
          No files have been shared with you yet.
        </p>
      ) : (
        <Card className="mb-4">
          {sharedFiles.map((file) => (
            <>
              <CardContent
                key={file.id}
                className="flex flex-col justify-start items-start gap-1 w-full h-fit pointer-events-auto aspect-auto"
              >
                <p className="mt-2 text-gray-600 text-sm">
                  Shared by: {file.sharedBy}
                </p>
                <Link
                  className="w-full text-sm cursor-pointer"
                  href={`/dashboard/documents/${file.id}`}
                >
                  <p className="dark:text-white">{file.name.slice(0, 40)}</p>
                </Link>
              </CardContent>
              <Separator />
            </>
          ))}
        </Card>
      )}
    </div>
  );
}
