"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Home, Menu, X } from "lucide-react";
import { ModeToggle } from "./Theme";
import { SignedIn, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Separator } from "./ui/separator";

export default function MobileNav() {
  const { isSignedIn } = useAuth();

  const [open, setOpen] = React.useState(false);

  return (
    <NavigationMenu className="top-0 fixed lg:hidden bg-white dark:bg-slate-950 border-b">
      <NavigationMenuItem
        className={cn(
          open && "absolute top-10  z-10 -translate-x-2 w-20 h-20",
          "flex ml-4 my-2 justify-center items-center border-2 bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 mt-1 rounded-full  animate-gradient"
        )}
      >
        <Link className="cursor-pointer" href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={1080}
            height={1080}
            className={cn(
              open ? "w-20 h-20 cursor-pointer  rounded-full" : "w-12 h-12"
            )}
          />
        </Link>
      </NavigationMenuItem>
      <Menu
        onClick={() => setOpen(!open)}
        className={
          cn(open ? "hidden" : "block") +
          " mr-2 ml-auto w-10 h-10 cursor-pointer"
        }
      />
      <X
        onClick={() => setOpen(!open)}
        className={cn(
          open ? "block cursor-pointer absolute right-5 top-2" : "hidden"
        )}
      />

      <NavigationMenuList
        className={cn(
          open ? "flex flex-col items-center justify-center h-screen" : "hidden"
        )}
      >
        <div className="relative flex flex-col justify-center items-center gap-4 mt-auto pt-20">
          {isSignedIn && (
            <NavigationMenuItem className="p-2">
              <Link href="/dashboard/home" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem className="p-2">
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Docs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="p-2">
            <Link href="/policy" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Policy
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="p-2">
            <Link href="/reviews" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Reviews
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
        <div className="flex justify-center items-center gap-4 mt-auto mb-10">
          <NavigationMenuItem className="p-2">
            <ModeToggle />
          </NavigationMenuItem>
          {isSignedIn && <Separator />}
          <NavigationMenuItem className="p-2">
            {isSignedIn ? (
              <div className="py-1">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            ) : (
              <div className="bg-orange-500/90 hover:bg-orange-500 px-5 py-2 rounded-lg w-[6rem] h-10 text-[14px] text-primary-foreground">
                <SignUpButton />
              </div>
            )}
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string; title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="font-medium text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
