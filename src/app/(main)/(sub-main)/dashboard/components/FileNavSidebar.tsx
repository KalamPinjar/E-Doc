import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { File } from "@prisma/client";

interface FileNavSidebarProps {
  allFiles: File[];
}
const FileNavSidebar: React.FC<FileNavSidebarProps> = ({ allFiles }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-4 bg-white shadow-sm mt-16 p-2 rounded-md w-[400px] h-fit">
      <p className="mt-2 font-bold text-black text-xl">Your Files</p>
      <div className="flex flex-col justify-start items-center gap-4 mt-2 h-fit">
        {allFiles.map((file) => (
          <div className="w-full" key={file.id}>
            <Link  href={`/dashboard/documents/${file.id}`}>
              <div className="flex justify-start items-center gap-2 mt-2 mb-2 py-2 text-black">
                <div className="bg-black rounded-full w-8 h-8"></div>
                {file.name.slice(0, 40)}
              </div>
            <Separator />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileNavSidebar;
