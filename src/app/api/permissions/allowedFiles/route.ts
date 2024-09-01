// /app/api/permissions/allowedFiles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { currentProfile } from '@/lib/current-profile';

export async function GET(req: NextRequest) {
  try {
    const user = await currentProfile();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const allowedFiles = await db.file.findMany({
      where: {
        permissions: {
          some: {
            allowedUserId: user.userId,
          },
        },
      },
    });

    return NextResponse.json(allowedFiles);
  } catch (error) {
    console.error('Error fetching allowed files:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
