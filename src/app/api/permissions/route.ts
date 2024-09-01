import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { currentProfile } from '@/lib/current-profile';

export async function POST(req: NextRequest) {
  try {
    const { allowedUserId, fileId } = await req.json();
    const user = await currentProfile(); // Get the authenticated user's session

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!allowedUserId || !fileId) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Check if the file exists and is owned by the authenticated user
    const file = await db.file.findFirst({
      where: {
        id: fileId,
        fileId: user.userId,
      },
    });

    if (!file) {
      return NextResponse.json({ message: 'File not found or not owned by the user' }, { status: 404 });
    }

    // Check if the permission already exists
    const existingPermission = await db.filePermission.findFirst({
      where: {
        ownerUserId: user.userId,
        allowedUserId,
        fileId,
      },
    });

    if (existingPermission) {
      return NextResponse.json({ message: 'Permission already exists' }, { status: 400 });
    }

    // Create a new file permission
    await db.filePermission.create({
      data: {
        ownerUserId: user.userId,
        allowedUserId,
        fileId, // Associate with the specific file
      },
    });

    return NextResponse.json({ message: 'Permission granted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating permission:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
