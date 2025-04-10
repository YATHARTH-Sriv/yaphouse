import dbconnect from '@/lib/db/connect';
import Comment from '@/lib/db/models/Comment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbconnect();
    const comments = await Comment.find({ podcastId: params.id }).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbconnect();
    const data = await request.json();
    const comment = await Comment.create({
      ...data,
      podcastId: params.id
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}