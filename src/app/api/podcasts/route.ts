// // src/app/api/podcasts/route.ts
// import dbconnect from '@/lib/db/connect';
// import Podcast from '@/lib/db/models/Podcast';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     await dbconnect();
//     const podcasts = await Podcast.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(podcasts);
//   } catch (error) {
//     console.error("Error fetching podcasts:", error);
//     return NextResponse.json({ error: 'Failed to fetch podcasts' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     await dbconnect();
//     const data = await request.json();
//     console.log("Creating podcast with data:", data);
    
//     const podcast = await Podcast.create(data);
//     console.log("Created podcast:", podcast);
    
//     return NextResponse.json({ 
//       _id: podcast._id.toString(),
//       title: podcast.title,
//       description: podcast.description,
//       audioUrl: podcast.audioUrl,
//       createdAt: podcast.createdAt
//     }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating podcast:", error);
//     return NextResponse.json({ 
//       error: 'Failed to create podcast', 
//       details: error instanceof Error ? error.message : 'Unknown error' 
//     }, { status: 500 });
//   }
// }

// src/app/api/podcasts/route.ts
import dbconnect from '@/lib/db/connect';
import Podcast from '@/lib/db/models/Podcast';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbconnect();
    const podcasts = await Podcast.find({}).sort({ createdAt: -1 });
    return NextResponse.json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json({ error: 'Failed to fetch podcasts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbconnect();
    const data = await request.json();
    console.log("Creating podcast with data:", data);
    
    const podcast = await Podcast.create(data);
    console.log("Created podcast:", podcast);
    
    return NextResponse.json({ 
      _id: podcast._id.toString(),
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl,
      thumbnailUrl: podcast.thumbnailUrl,
      createdAt: podcast.createdAt
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating podcast:", error);
    return NextResponse.json({ 
      error: 'Failed to create podcast', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}