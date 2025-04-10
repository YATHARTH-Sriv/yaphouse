'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaImage, FaMicrophone, FaArrowLeft } from 'react-icons/fa';
import { AnimatedBackground } from '@/components/landingpage-components/Animated-background';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client'; 
import ThumbnailUploader from '@/components/room/thumbnailuploader';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  // Function to handle thumbnail URL from CustomImageUploader
  const handleThumbnailUploaded = (url: string) => {
    setThumbnailUrl(url);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !audioFile || !thumbnailUrl) {
      alert('Please fill all required fields (title, description, audio file, and thumbnail)');
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload audio file to Vercel Blob
      const blob = await upload(audioFile.name, audioFile, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (progressEvent) => {
          console.log(`Upload progress: ${progressEvent.percentage}%`);
        },
      });
      
      // Create podcast in database
      const podcastRes = await fetch('/api/podcasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          audioUrl: blob.url,
          thumbnailUrl: thumbnailUrl,
        }),
      });

      if (!podcastRes.ok) {
        throw new Error('Failed to create podcast');
      }

      const podcastData = await podcastRes.json();
      
      // Redirect to the podcast page
      router.push(`/mainpage`);
      router.refresh();
      
    } catch (error) {
      console.error('Error creating podcast:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <Link href="/mainpage">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <FaArrowLeft />
            Back to Rooms
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
        >
          <h1 className="text-3xl font-bold mb-6">Create New Room</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Room Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter room title..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-32"
                  placeholder="Describe your room..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Audio File</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="flex items-center gap-2 w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-pointer hover:bg-gray-800/50"
                  >
                    <FaMicrophone />
                    {audioFile ? audioFile.name : "Select audio file..."}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <ThumbnailUploader onImageUploaded={handleThumbnailUploaded} />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isUploading}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full px-8 py-3 flex items-center gap-2 font-medium shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
            >
              <FaUpload />
              {isUploading ? 'Creating...' : 'Create Room'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}