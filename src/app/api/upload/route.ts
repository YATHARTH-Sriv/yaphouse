// import { NextRequest, NextResponse } from 'next/server';
// import { writeFile } from 'fs/promises';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File;
    
//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
    
//     // Create a unique filename
//     const filename = `${uuidv4()}-${file.name}`;
    
//     // Save to /public/uploads
//     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//     const filePath = path.join(uploadDir, filename);
    
//     await writeFile(filePath, buffer);
    
//     // Return the URL to access the file
//     const fileUrl = `/uploads/${filename}`;
    
//     return NextResponse.json({ fileUrl });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }

import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json() as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Generate a client token for the browser to upload the file
        return {
          allowedContentTypes: ['audio/*'],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100MB (adjust as needed for audio)
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        console.log('Audio upload completed:', blob, tokenPayload)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}