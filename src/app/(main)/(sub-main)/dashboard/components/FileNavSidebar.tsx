import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { File } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FileNavSidebarProps {
  allFiles: File[];
  open: boolean;
  onClose: () => void;
}

const FileNavSidebar: React.FC<FileNavSidebarProps> = ({
  allFiles,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:mt-16 rounded-xl w-[300px]">
        <div
          className={cn(
            "flex flex-col justify-start items-center gap-4 shadow-sm mt-0 p-2 rounded-md w-full h-fit"
          )}
        >
          <p className="mt-2 font-bold text-xl dark:text-white">Your Files</p>
          <div className="flex flex-col justify-start items-center gap-4 p-4 w-full h-fit">
            {allFiles.map((file) => (
              <div className="w-full" key={file.id}>
                <Link href={`/dashboard/documents/${file.id}`}>
                  <div className="flex justify-start items-center gap-2 mt-2 mb-2 py-2 dark:text-white">
                    <div className="border-2 dark:border-white bg-black rounded-full w-8 h-8"></div>
                    {file.name.slice(0, 40)}
                  </div>
                  <Separator />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileNavSidebar;
