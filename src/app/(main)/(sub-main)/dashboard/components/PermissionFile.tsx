"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  fileId: string;
  setChangePerm: React.Dispatch<React.SetStateAction<boolean>>;
  changePerm: boolean;
}
const PermissionFile: React.FC<Props> = ({
  fileId,
  setChangePerm,
  changePerm,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/allUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAllowUser = async (allowedUserId: string) => {
    try {
      const response = await fetch("/api/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allowedUserId, fileId }),
      });
  
      if (response.ok) {
        toast.success("Permission granted successfully!");
        setChangePerm(false);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error granting permission:", error);
      toast.error("Failed to grant permission");
    }
  };
  

  return (
    <Dialog open={changePerm} onOpenChange={() => setChangePerm(false)}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            Select the Users you want to Allow to view this file
          </DialogTitle>
          <DialogDescription>
            <span className="font-bold text-red-500">
              Be careful, you can&apos;t undo this action
            </span>
            , select the users you want to allow to view this file
          </DialogDescription>
          <div className="flex flex-col gap-2 bg-slate-800 p-2 rounded-sm w-full">
            {users.map((user: any) => (
              <div key={user.id} className="flex justify-between items-center gap-2 p-4">
                <p>{user.email}</p>
                <p>{format(new Date(user.createdAt), "dd/MM/yyyy")}</p>
                <Button
                  className="flex items-center w-20 h-8"
                  onClick={() => handleAllowUser(user.userId)}
                >
                  Allow
                </Button>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionFile;
