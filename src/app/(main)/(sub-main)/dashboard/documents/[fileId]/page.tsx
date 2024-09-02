"use client";

import { File } from "@prisma/client";
import { Circle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import FileNavSidebar from "../../components/FileNavSidebar";

const FileId = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchFile();
    fetchAllfiles();
  }, [fileId]);

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
    <div className="flex lg:flex-row flex-col justify-center items-center gap-4 lg:mt-14 h-screen dark:text-white">
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <span className="top-[4.5rem] right-[4rem] absolute font-bold text-sm dark:text-white">
          Your Files
        </span>
        <Circle className="top-16 right-5 absolute w-10 h-10 fill-black" />
      </div>
      <div className="flex flex-col justify-start items-start lg:items-center gap-4 mx-auto lg:mx-0 mt-12 lg:mt-8 h-full">
        {file && file.url && file.url.endsWith(".pdf") ? (
          <div>
            <p className="mt-2 text-center text-white">
              PDF {file.name.slice(0, 40)}
            </p>
            <iframe
              src={file.url || ""}
              className="border-2 border-gray-300 rounded-lg w-[400px] h-[500px]"
            />
          </div>
        ) : (
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

      <FileNavSidebar
        open={open}
        allFiles={allFiles}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default FileId;
