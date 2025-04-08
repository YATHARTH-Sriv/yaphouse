import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(){
    // const apiKey = process.env.YOUTUBE_API_KEY;
    const apiKey=process.env.YOUTUBE_API
    const videoid="lpPEoJm5S8c"
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoid}&key=${apiKey}`;
    const { data } = await axios.get(videoUrl);
    // console.log("Raw YouTube API response:", JSON.stringify(data, null, 2));
    console.log(videoUrl)
    return NextResponse.json({data})
}