"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Printer, Settings2, Share2, User2 } from "lucide-react";

const Menu = () => {
  return (
    <Menubar className="inline-flex bg-inherit border-none">
      <MenubarMenu>
        <MenubarTrigger className="text-black cursor-pointer">
          Manage <Settings2 className="w-4 h-4" />
        </MenubarTrigger>
        <MenubarContent className="mt-1">
          <MenubarItem className="cursor-pointer">
            Share <Share2 className="ml-2 w-4 h-4" />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer">
            Print <Printer className="ml-2 w-4 h-4" />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="mt-1 text-rose-500 cursor-pointer">
            Permissions <User2 className="ml-2 w-4 h-4" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
