/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Button } from "@/components/ui/button";
import { File } from "@prisma/client";
import { Frame, Image, Loader2, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
const Documents = () => {
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      const response = await fetch("/api/files");
      if (!response.ok) {
        console.error("Failed to fetch files");
        return;
      }
      const data = await response.json();
      setFiles(data);
      setIsLoading(false);
      // console.log(data);
    };

    fetchFiles();
  }, [setFiles]);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const response = await fetch(`/api/files/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setIsDeleting("");
      setFiles(files.filter((file: File) => file.id !== id));
      router.refresh();
    } else {
      const errorText = await response.text();
      console.error("Failed to delete file:", errorText);
    }
  };

  return (
    <div className="flex md:flex-row flex-col h-full lg:gap-4 gap-1 mt-5">
      {isLoading ? (
        <div className="mt-10 flex justify-center items-center h-full w-full text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        files.length === 0 && (
          <div className="mt-10 flex justify-center items-center h-full w-full text-white">
            No files found
          </div>
        )
      )}
      {files.map((file: File) => (
        <ul key={file.id} className=" mt-8 divide-y divide-zinc-200">
          <li className="col-span-1 bg-white shadow hover:shadow-lg rounded-lg divide-y divide-gray-200 transition">
            <Link href={`/dashboard/documents/${file.id}`}>
              <div className="flex justify-between items-center space-x-6 px-6 p-6 w-full">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full w-10 h-10"></div>
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900 text-sm truncate capitalize">
                      {file.name.slice(0, 30) + "..."}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
            <div className="gap-6 grid grid-cols-3 mt-4 px-6 py-2 w-full text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {format(new Date(file.createdAt), "dd MMM yyyy")}
              </div>

              {file && file.url && file.url.endsWith(".pdf") ? (
                <div className="flex items-center gap-2">
                  <Frame className="w-4 h-4" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Image  className="w-4 h-4" />
                </div>
              )}
              <Button
                onClick={() => handleDelete(file.id)}
                variant="destructive"
                size="sm"
                className=""
              >
                {isDeleting === file.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash className="w-4 h-4" />
                )}
              </Button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Documents;
