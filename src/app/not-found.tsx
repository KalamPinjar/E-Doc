import { Button } from "@/components/ui/button";

import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <div className="text-center">
        <div className="ml-6 w-full" >
          <iframe src="https://lottie.host/embed/0d572f75-5093-437c-a11c-218b2d2aac8a/J5Ss0aurY7.json"></iframe>
        </div>
        <p className="mt-4 font-bold text-3xl text-slate-900 tracking-tight">
          Page Not Found
        </p>
        <p className="mt-4 text-md text-slate-600">
          Sorry, we couldn’t find what you were looking for.
        </p>
        <p className="mt-4 text-md text-slate-600">
          Check out our{" "}
          <Link href="/docs" className="text-blue-500">
            docs
          </Link>{" "}
          for more information.
        </p>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
