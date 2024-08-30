import { db } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

// Handle GET requests to retrieve the files
export async function GET(request: Request) {
  try {
    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const files = await db.file.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error("Error retrieving files:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Handle POST requests to store file data
export async function POST(request: Request) {
  try {
    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const files = await db.file.findMany({
      include: {
        user: true,
      },
    });
    console.log(files);
    return new NextResponse("File Created!", { status: 200 });
  } catch (error) {
    console.error("Error storing file data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
