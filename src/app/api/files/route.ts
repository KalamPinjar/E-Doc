import { db } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await currentProfile();

    // Check if the user is authenticated
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch only files that belong to the authenticated user
    const files = await db.file.findMany({
      where: { fileId: user.userId },  // Scope to the authenticated user
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

    // Check if the user is authenticated
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the file data from the request (assuming JSON body)
    const body = await request.json();
    const { name, fileKey, url } = body;

    if (!name || !fileKey) {
      return new NextResponse("Invalid file data", { status: 400 });
    }

    // Create a new file entry associated with the authenticated user
    const newFile = await db.file.create({
      data: {
        name,
        fileKey,
        url,
        fileId: user.userId,  // Associate file with the authenticated user's ID
      },
    });

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    console.error("Error storing file data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}