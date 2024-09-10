import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Assuming you have a prisma instance setup
import { getAuth } from '@clerk/nextjs/server';

// GET method
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const audioData = await db.audioFile.findMany({
      where: { userId },
      include: {
        predictions: true, 
      },
    });

    return NextResponse.json(audioData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch audio data' }, { status: 500 });
  }
}

