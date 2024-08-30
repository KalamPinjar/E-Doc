import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative border-[1px] border-gray-300 dark:border-slate-600 bg-[#fafafa] dark:bg-slate-950 shadow-black shadow-lg dark:shadow-sm dark:shadow-white m-2 px-4 sm:px-6 lg:px-8 p-2 rounded-lg max-w-7xl h-screen text-black">
        {children}
      </div>
    </div>
  );
};

export default Layout;
