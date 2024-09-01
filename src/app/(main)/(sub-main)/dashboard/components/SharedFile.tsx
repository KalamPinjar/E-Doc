"use client";
import * as React from "react";
import { File as PrismaFile } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Define a type that extends the Prisma File type to include sharedBy
type SharedFile = PrismaFile & {
  sharedBy: string; // Add the sharedBy property to the type
};

export function SharedFiles() {
  const [sharedFiles, setSharedFiles] = React.useState<SharedFile[]>([]);
  
  React.useEffect(() => {
    // Fetch files shared with the current user
    const fetchSharedFiles = async () => {
      const response = await fetch("/api/permissions/sharedFiles"); // New API endpoint for shared files
      if (!response.ok) {
        console.error("Failed to fetch shared files");
        return;
      }
      const data: SharedFile[] = await response.json(); // Use the SharedFile type
      setSharedFiles(data);
    };

    fetchSharedFiles();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 font-bold text-white text-xl">Files Shared with You</h2>
      {sharedFiles.length === 0 ? (
        <p>No files have been shared with you yet.</p>
      ) : (
        sharedFiles.map((file) => (
          <Card key={file.id} className="mb-4">
            <CardContent className="flex flex-col justify-center items-center gap-6 h-[420px] pointer-events-auto aspect-auto">
              {file.url?.endsWith(".pdf") ? (
                <Link
                  className="px-2 cursor-pointer"
                  href={`/dashboard/documents/${file.id}`}
                >
                  <iframe
                    title="pdf"
                    src={file.url}
                    className="w-[380px] h-[380px]"
                    style={{ border: "none" }}
                    allowFullScreen
                  />
                </Link>
              ) : (
                <Link
                  className="cursor-pointer"
                  href={`/dashboard/documents/${file.id}`}
                >
                  <Image
                    src={file.url || ""}
                    alt="image"
                    width={280}
                    height={280}
                  />
                </Link>
              )}
              <p className="mt-2 text-gray-600 text-sm">Shared by: {file.sharedBy}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
