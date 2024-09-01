import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { currentProfile } from '@/lib/current-profile';

export async function GET(req: NextRequest) {
  try {
    const user = await currentProfile();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch only the files owned by the current user
    const userFiles = await db.file.findMany({
      where: {
        fileId: user.userId, // Ensure that this matches your schema for file ownership
      },
    });

    return NextResponse.json(userFiles);
  } catch (error) {
    console.error('Error fetching user files:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
