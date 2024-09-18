import { db } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { utapi } from "@/server/uploadthing";
import { NextResponse } from "next/server";

// Handle POST requests to store file data
export async function DELETE(request: Request) {
  try {
    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); // Extracts the ID from the path

    if (!id) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const file = await db.file.findUnique({ where: { id } });

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Delete related permissions
    await db.filePermission.deleteMany({
      where: { fileId: id },
    });

    // Delete the file from storage
    await utapi.deleteFiles(file.fileKey);

    // Delete the file record from the database
    await db.file.delete({ where: { id } });

    return new NextResponse("File Deleted!", { status: 200 });
  } catch (error) {
    console.error("Error Deleting file data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract ID from URL path

    if (!id) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const file = await db.file.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    return NextResponse.json(file, { status: 200 });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
