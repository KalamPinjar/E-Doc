"use client";
import Navbar from "@/components/Navbar";
import ParallaxUI from "@/components/ui/ParallaxUI";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      // console.log("User is signed in with userId:", userId);
      const storeUserData = async () => {
        try {
          const response = await fetch("/api/storeUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (response.ok) {
            console.log("User data stored successfully");
            
          } else {
            console.error("Failed to store user data");
          }
        } catch (error) {
          console.error("Error storing user data:", error);
        }
      };

      storeUserData();
    }
  }, [isSignedIn, userId]);

  return (
    <main className="z-30 h-screen">
      <Navbar />
      <div className="variant">
        <div className="bg-image bg-image--blur"></div>
      </div>
      <div className="flex flex-col justify-between items-center p-24 min-h-screen">
        <div className="lg:flex justify-between items-center w-full max-w-5xl font-mono text-sm">
          <p className="drop-shadow max-w-2xl font-bold text-3xl">
            One Place to All of Your Docs,
            <br className="lg:block hidden" />
            <span className="bg-clip-text bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 text-transparent animate-gradient">
              Safe and Private
            </span>
            <Link
              href="/dashboard/home"
              className="inline-block relative dark:border-white/20 bg-clip-text bg-gray-200 dark:hover:bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 mt-6 py-2 border dark:hover:bg-clip-border border-black/20 dark:rounded-lg focus:ring w-3/4 font-medium text-black text-center text-lg dark:text-white animate-gradient overflow-hidden group focus:outline-none"
            >
              <span className="group-hover:w-full top-0 left-0 absolute dark:border-white border-t-2 border-black/75 w-0 h-0 transition-all duration-500 ease"></span>
              <span className="group-hover:h-full top-0 right-0 absolute dark:border-white border-r-2 border-black/75 w-0 h-0 transition-all duration-500 ease"></span>
              <span className="group-hover:w-full right-0 bottom-0 absolute dark:border-white border-b-2 border-black/75 w-0 h-0 transition-all duration-500 ease"></span>
              <span className="group-hover:h-full bottom-0 left-0 absolute dark:border-white border-black/75 border-l-2 w-0 h-0 transition-all duration-500 ease"></span>
              Get Started
            </Link>
          </p>
          <div className="top-0 left-0 lg:static fixed flex justify-center items-end bg-gradient-to-t from-white dark:from-black via-white dark:via-black lg:bg-none w-full h-28 lg:size-auto">
            <Link
              className="flex flex-col place-items-center gap-2 lg:p-0 font-bold pointer-events-none lg:pointer-events-auto"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ParallaxUI className="border-2 p-2 rounded-md">
                <div className="flex gap-2 w-[100px] h-[100px]">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={100}
                    height={24}
                  />
                </div>
              </ParallaxUI>
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 mb-32 lg:mb-0 lg:w-full lg:max-w-5xl text-center lg:text-left">
          <Link
            href="/docs"
            className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 font-semibold text-2xl">
              Docs{" "}
              <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
                -&gt;
              </span>
            </h2>
            <p className="opacity-50 m-0 max-w-[30ch] text-sm">
              Find in-depth information about on how to use E-doc.
            </p>
          </Link>

          <Link
            href="/policy"
            className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 font-semibold text-2xl">
              Policy{" "}
              <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
                -&gt;
              </span>
            </h2>
            <p className="opacity-50 m-0 max-w-[30ch] text-sm">
              Learn about our policy and privacy we provide.
            </p>
          </Link>

          <Link
            href="/reviews"
            className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 font-semibold text-2xl">
              Reviews{" "}
              <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
                -&gt;
              </span>
            </h2>
            <p className="opacity-50 m-0 max-w-[30ch] text-sm">
              Read reviews of our users used our services
            </p>
          </Link>

          <Link
            href="/dashboard/help"
            className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 font-semibold text-2xl">
              Help{" "}
              <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
                -&gt;
              </span>
            </h2>
            <p className="opacity-50 m-0 max-w-[30ch] text-balance text-sm">
              Ask for assitance from our AI to resolve your queries
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
