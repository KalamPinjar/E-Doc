import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
const Documents = () => {
  return (
    <div>
      <ul className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-8 divide-y divide-zinc-200">
        <li className="col-span-1 bg-white shadow hover:shadow-lg rounded-lg divide-y divide-gray-200 transition">
          <Link href={``} className="flex flex-col gap-2">
            <div className="flex justify-between items-center space-x-6 px-6 p-6 w-full">
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full w-10 h-10"></div>
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-gray-900 text-sm truncate capitalize">
                    File test 1
                  </h3>
                </div>
              </div>
            </div>
          </Link>
          <div className="gap-6 grid grid-cols-3 mt-4 px-6 py-2 w-full text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {/* {format(new Date(file.createdAt), "dd MMM yyyy")} */}
            </div>
            <div></div>
            <Button
            
              //   onClick={() => deleteFile({ id: file.id })}
              //   disabled={currentlyDeleting === file.id}
              variant="destructive"
              size="sm"
              className=""
            >
              {/* {currentlyDeleting === file.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                )} */}
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Documents;
