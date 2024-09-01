import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { currentProfile } from '@/lib/current-profile';

export async function GET(req: NextRequest) {
  try {
    const user = await currentProfile();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch files shared with the current user along with the user who shared them
    const sharedFiles = await db.file.findMany({
      where: {
        permissions: {
          some: {
            allowedUserId: user.userId,
          },
        },
      },
      include: {
        permissions: {
          where: {
            allowedUserId: user.userId,
          },
          include: {
            owner: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    // Format the response to include shared user email
    const formattedFiles = sharedFiles.map((file) => ({
      ...file,
      sharedBy: file.permissions[0]?.owner.email || 'Unknown', // Get the email of the user who shared the file
    }));

    return NextResponse.json(formattedFiles);
  } catch (error) {
    console.error('Error fetching shared files:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
