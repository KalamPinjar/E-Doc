import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import Menu from "./components/Menu";
import Upload from "./components/Upload";
import { File } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative border-[1px] border-gray-300 dark:border-slate-600 bg-[#fafafa] dark:bg-slate-950 shadow-black shadow-lg dark:shadow-sm dark:shadow-white m-2 mx-auto px-4 sm:px-6 lg:px-8 p-2 rounded-lg max-w-7xl min-h-screen text-black">
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
          <div className="flex gap-3 bg-[#f1f1f1] shadow-black shadow-md p-1 rounded-md w-[510px]">
            <Link
              className="ml-auto"
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-transparent hover:bg-gray-300 dark:text-black">
                Docs
              </Button>
            </Link>
            <Separator className="mr-2" orientation="vertical" />
            <Link
              href="/dashboard/documents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-transparent hover:bg-gray-300 dark:text-black">
                Documents <File className="ml-2 w-4 h-4 fill-blue-600" />
              </Button>
            </Link>
            <Separator className="mr-2" orientation="vertical" />
            <Menu />
            <Separator className="mr-2" orientation="vertical" />
            <Upload />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
