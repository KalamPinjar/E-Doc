"use client";

import { File } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FileId = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
     
      try {
        const response = await fetch(`/api/files/${fileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          console.error("Failed to fetch file");
          return;
        }
  
        const data = await response.json();
  
        setFile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchFile();
  }, [fileId]); // Include id in the dependency array
  

  if (!file) {
    return (
      <div className="flex justify-center items-center mt-10 w-full h-full text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center gap-4 mt-8 h-screen">
      {file && file.url && file.url.endsWith(".pdf") ? (
        // For PDFs, use an iframe to display the PDF
        <div>
          <p className="mt-2 text-white">PDF {file.name}</p>
          <iframe
            src={file.url || ""}
            width="500"
            height="500"
            className="border-2 border-gray-300 rounded-lg"
          />
        </div>
      ) : (
        // For images, use the Image component
        <Image
          src={file.url || ""}
          alt={file.name}
          width={500}
          height={500}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default FileId;
