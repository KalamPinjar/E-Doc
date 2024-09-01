"use client";

import { Separator } from "@/components/ui/separator";
import { File } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FileNavSidebar from "../../components/FileNavSidebar";

const FileId = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [allFiles, setAllFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/files/${fileId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch file");
          return;
        }

        const data = await response.json();

        setFile(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFile();
    fetchAllfiles();
  }, [fileId]); // Include id in the dependency array

  const fetchAllfiles = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch files");
        return;
      }

      const data = await response.json();

      setAllFiles(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!file) {
    return (
      <div className="flex justify-center items-center mt-10 w-full h-full text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-around items-start gap-4 mt-8 h-screen dark:text-white">
      <div className="flex flex-col justify-start items-center gap-4 mt-8 h-screen">
        {file && file.url && file.url.endsWith(".pdf") ? (
          // For PDFs, use an iframe to display the PDF
          <div>
            <p className="mt-2 text-center text-white">
              PDF {file.name.slice(0, 40)}
            </p>
            <iframe
              src={file.url || ""}
              width="500"
              height="500"
              className="border-2 border-gray-300 rounded-lg"
            />
          </div>
        ) : (
          // For images, use the Image component
          <div className="relative w-[400px] h-[500px]">
            <p className="text-center text-white">
              Image {file.name.slice(0, 40)}
            </p>
            <Image
              unoptimized
              src={file.url || ""}
              alt={file.name}
              fill
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <FileNavSidebar allFiles={allFiles} />
    </div>
  );
};

export default FileId;
