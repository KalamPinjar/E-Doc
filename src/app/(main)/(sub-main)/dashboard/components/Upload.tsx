"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CirclePlus } from "lucide-react";

const Upload = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 bg-blue-500 shadow-black shadow-sm px-4 py-2 rounded-lg text-sm text-white">
        Upload <CirclePlus className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select the files you want to upload</DialogTitle>
          <DialogDescription>
            Your files will be uploaded to a secure server through which you can
            share them with whom you trust.
          </DialogDescription>
        </DialogHeader>
        <div className="relative flex justify-center items-center dark:border-2 p-1 pt-0 pb-2 border-dotted rounded-[calc(0.5rem+1px)]">
          <UploadDropzone
            className="flex justify-center items-center dark:bg-slate-800 w-full h-full ut-allowed-content:ut-uploading:text-red-300 cursor-pointer"
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              toast.success("File uploaded successfully");
              setIsMounted(false);
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log("Error: ", error);
              toast.error(error.message);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Upload;
