import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";

const FileNavSidebar = dynamic(() => import("./components/FileNavSidebar"), {
  ssr: false,
});

const Menu = dynamic(() => import("./components/Menu"), {
  ssr: false,
});

const Upload = dynamic(() => import("./components/Upload"), {
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Navbar />
      <MobileNav />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative border-[1px] border-gray-300 dark:border-slate-600 bg-[#fafafa] dark:bg-slate-950 shadow-black shadow-lg dark:shadow-sm dark:shadow-white m-2 md:mx-4 mt-[5rem] md:mt-[5rem] lg:mt-[2rem] px-1 py-2 rounded-lg max-w-7xl min-h-screen text-black">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <div className="flex justify-end w-full">
          <div className="flex md:gap-3 bg-[#f1f1f1] shadow-black shadow-md mr-1 md:mr-2 p-1 rounded-md w-[300px] md:w-[383px]">
            <Link
              className="ml-auto"
              rel="noopener noreferrer"
              href="/docs"
              target="_blank"
            >
              <Button className="bg-transparent hover:bg-gray-300 text-black">
                Docs
              </Button>
            </Link>
            <Separator className="mr-1 md:mr-2" orientation="vertical" />
            <Link
              href="/dashboard/documents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-transparent hover:bg-gray-300 text-black">
                Documents <File className="ml-2 w-4 h-4 fill-blue-600" />
              </Button>
            </Link>
            <Separator className="mr-1 md:mr-2" orientation="vertical" />
            <Menu />
            <Separator className="mr-1 md:mr-2" orientation="vertical" />
          </div>
          <Upload />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
