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
  CardDescription,
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
    <div className="mx-auto max-w-xs">
      <div className="mb-2 ml-20 text-center text-muted-foreground text-sm">
        Slide {current} of {files.length}
      </div>
      <Carousel setApi={setApi} className="w-[400px] h-[400px]">
        <CarouselContent>
          {files?.map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex justify-center items-center p-6 pointer-events-auto aspect-auto">
                  {files &&
                  files[index].url &&
                  files[index].url.endsWith(".pdf") ? (
                    <Link
                      className="px-2 cursor-pointer"
                      href={`/dashboard/documents/${files[index].id}`}
                    >
                      <iframe
                        title="pdf"
                        src={files[index].url}
                        className="w-[380px] h-[380px]"
                        style={{ border: "none" }}
                        allowFullScreen
                      />
                    </Link>
                  ) : (
                    <Link
                      className="cursor-pointer"
                      href={`/dashboard/documents/${files[index].id}`}
                    >
                      <Image
                        src={files[index].url || ""}
                        alt="image"
                        width={280}
                        height={280}
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
      </Carousel>
    </div>
  );
}
