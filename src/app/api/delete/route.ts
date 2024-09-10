import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Assuming you have a prisma instance setup

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const recordId = url.searchParams.get('id'); // Fetch record ID from query params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!recordId) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    // Check if the record belongs to the logged-in user
    const record = await db.audioFile.findFirst({
      where: {
        id: recordId,
        userId: userId,
      },
    });

    if (!record) {
      return NextResponse.json({ error: 'Record not found or unauthorized' }, { status: 404 });
    }

    // Delete the record
    await db.audioFile.delete({
      where: { id: recordId },
    });

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
