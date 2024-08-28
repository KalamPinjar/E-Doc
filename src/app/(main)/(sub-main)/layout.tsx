"use client";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  let pathnameFormat = pathname.split("/").join(" ");
  return (
    <div className="bg-slate-950">
      <Navbar />
      <div className="relative border-[1px] border-slate-600 dark:bg-[url(/images/grid-lines.png)] bg-[#fafafa] dark:bg-slate-950 m-2 px-4 sm:px-6 lg:px-8 p-2 rounded-lg max-w-7xl h-screen text-black">
   
        <div className="bg-[length:100%_1px] bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-no-repeat bg-bottom pb-2 w-full text-white">
          <h2 className="font-bold text-3xl text-black dark:text-white capitalize">
            ▫ {pathnameFormat} ▫
          </h2>
        </div>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
