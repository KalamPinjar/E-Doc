"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Download,  Settings2, Share2, User2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PermissionFile from "./PermissionFile";

const Menu = () => {
  const params = useParams<{ fileId: string }>();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [changePerm, setChangePerm] = useState(false);

  // Function to handle file download
  const handleDownload = async () => {
    try {
      // Replace with actual API call to get the file URL by fileId
      const response = await fetch(`/api/files/${params.fileId}`);
      const data = await response.json();

      if (data?.url) {
        setDownloadUrl(data.url);

        // Create a temporary anchor element and trigger download
        const anchor = document.createElement("a");
        anchor.href = data.url;
        anchor.target = "_blank";
        anchor.download = ''; // Optionally set a default filename
        anchor.click();
      } else {
        console.error("Download URL not found.");
      }
    } catch (error) {
      toast.error("Open the File first to download");
      console.error("Failed to download the file:", error);
    }
  };

  // Function to handle copying the file URL to clipboard
  const handleShare = async () => {
    try {
      // Replace with actual API call to get the file URL by fileId
      const response = await fetch(`/api/files/${params.fileId}`);
      const data = await response.json();

      if (data?.url) {
        await navigator.clipboard.writeText(data.url);
        toast.success("File URL copied to clipboard!");
      } else {
        toast.error("File URL not found.");
        console.error("File URL not found.");
      }
    } catch (error) {
      toast.error("Failed to copy URL to clipboard");
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  const handlePermission = () => {
    setChangePerm(prev => !prev);
  };

  return (
    <>
    <Menubar className="inline-flex bg-inherit border-none">
      <MenubarMenu>
        <MenubarTrigger className="text-black cursor-pointer">
          Manage <Settings2 className="w-4 h-4" />
        </MenubarTrigger>
        <MenubarContent className="mt-1">
          <MenubarItem className="cursor-pointer" onClick={handleShare}>
            Share <Share2 className="ml-2 w-4 h-4" />
          </MenubarItem>
          <MenubarSeparator />
         
          <MenubarItem className="cursor-pointer" onClick={handleDownload}>
            Download <Download className="ml-2 w-4 h-4" />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="mt-1 text-rose-500 cursor-pointer" onClick={handlePermission}>
            Permissions <User2 className="ml-2 w-4 h-4" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    <PermissionFile fileId={params.fileId} changePerm={changePerm} setChangePerm={setChangePerm}  />
    </>
  );
};

export default Menu;
