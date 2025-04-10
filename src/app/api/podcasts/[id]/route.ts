import dbconnect from '@/lib/db/connect';
import Podcast from '@/lib/db/models/Podcast';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbconnect();
    const podcast = await Podcast.findById(params.id);
    if (!podcast) {
      return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    }
    return NextResponse.json(podcast);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch podcast' }, { status: 500 });
  }
}