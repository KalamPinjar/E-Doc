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
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Home } from "lucide-react";
import { ModeToggle } from "./Theme";
import { SignedIn, SignUpButton, useAuth, useClerk, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const dashboard: { title: string; href: string; description: string }[] = [
  {
    title: "Home 🏠",
    href: "/dashboard/home",
    description:
      "Your personalized homepage showing recent activities and important updates.",
  },
  {
    title: "Documents 📃",
    href: "/dashboard/documents",
    description: "Manage, upload, and view all your documents in one place.",
  },
  {
    title: "Search 🔎",
    href: "/dashboard/search",
    description:
      "Quickly find documents using advanced search and filtering options.",
  },
  {
    title: "Upload 🔼",
    href: "/dashboard/upload",
    description: "Upload new documents and manage their categories and tags.",
  },
  {
    title: "Important ⭐",
    href: "/dashboard/important",
    description: "Access your important documents with ease.",
  },
  {
    title: "Help 📞",
    href: "/dashboard/help",
    description: "Get support and find answers to common questions.",
  },
];

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationMenu className="lg:block top-0 sticky hidden border-b">
      <NavigationMenuList className="px-4">
        <NavigationMenuItem className="flex justify-center items-center border-2 bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 mt-1 rounded-full w-12 h-12 animate-gradient">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={1080}
              height={1080}
              className="rounded-full w-12 h-12"
            />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={cn(isSignedIn ? "p-2" : "flex-1 p-2")}>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid lg:grid-cols-[.75fr_1fr] p-6 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex flex-col justify-start bg-gradient-to-b from-muted/50 to-muted focus:shadow-md p-6 rounded-md w-full h-full no-underline select-none outline-none"
                    href="/"
                  >
                    <Home className="bg-primary/10 p-2 rounded-full w-10 h-10" />
                    <div className="mt-4 mb-2 font-medium text-lg">E Docs</div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      The easiest way to get started
                      <br /> with e docs, right in your browser.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/introduction" title="Introduction">
                E docs is a documentation platform for everyone who wants to
                store and share their docs with their family members.
              </ListItem>
              <ListItem href="/docs/howtouse" title="How to use">
                How to use e docs to store and share your docs.
              </ListItem>
              <ListItem href="/docs/goal" title="Our Goal">
                Our goal is to provide a secure and private platform for users
                to store and share their docs only to those whom they trust.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isSignedIn && (
          <NavigationMenuItem className="flex-1 p-2">
            <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-3 grid md:grid-cols-2 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                {dashboard.map((list) => (
                  <ListItem
                    key={list.title}
                    title={list.title}
                    href={list.href}
                  >
                    {list.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem className="p-2">
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem className="p-2">
          {isSignedIn ? (
            <div className="py-1">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          ) : (
            <div className="bg-orange-500/90 hover:bg-orange-500 px-4 py-2 rounded-lg text-[14px] text-primary-foreground">
              <SignUpButton />
            </div>
          )}
         
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
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
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
