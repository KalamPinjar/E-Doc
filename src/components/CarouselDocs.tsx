"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function CarouselDocs() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [files, setFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Fetch the files uploaded by the current user
    const fetchFiles = async () => {
      const response = await fetch("/api/files");
      if (!response.ok) {
        console.error("Failed to fetch files");
        return;
      }
      const data = await response.json();
      setFiles(data);
    };

    fetchFiles();
  }, [api]);

  return (
    <div className="mx-auto mb-10 md:mb-0 md:ml-5">
      <h2 className="mb-4 font-bold text-black text-center text-xl dark:text-white">
        Your Documents
      </h2>

      <Carousel setApi={setApi} className="w-[300px] lg:w-[400px] h-[400px]">
        <CarouselContent>
          {files?.map((file, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex justify-center items-center gap-6 h-[420px] pointer-events-auto aspect-auto">
                  {file.url?.endsWith(".pdf") ? (
                    <Link
                      className="cursor-pointer"
                      href={`/dashboard/documents/${file.id}`}
                    >
                      <iframe
                        title="pdf"
                        src={file.url}
                        className="w-full lg:w-[380px] h-[380px] lg:h-[380px]"
                        style={{ border: "none" }}
                        allowFullScreen
                      />
                    </Link>
                  ) : (
                    <Link
                      className="cursor-pointer"
                      href={`/dashboard/documents/${file.id}`}
                    >
                      <Image
                        src={file.url || ""}
                        alt={`Image - ${file.name}`}
                        width={280}
                        height={280}
                        className="p-8 object-contain"
                      />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="mb-2 text-center text-muted-foreground text-sm">
          Slide {current} of {files.length}
        </div>
      </Carousel>
    </div>
  );
}
