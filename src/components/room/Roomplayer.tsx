"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaTimes } from 'react-icons/fa';
// import { Comments } from '../Comments';
import Image from 'next/image';
import { Comments } from '../comment/Comments';

interface RoomPlayerProps {
  id: string;
  title: string;
  creator: string;
  listeners: number;
  thumbnailUrl: string;
  audioUrl?: string; // Make this optional to support both mock data and real podcasts
  onClose: () => void;
}

export function RoomPlayer({ 
  id, 
  title, 
  creator, 
  listeners, 
  thumbnailUrl, 
  audioUrl,
  onClose 
}: RoomPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      
      // Set up event listeners
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      // Clean up on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current.remove();
        }
      };
    } else {
      // For mock data without actual audio, use the progress simulation
      if (!isPlaying) return;
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [audioUrl, isPlaying]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Handle mute/unmute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div
      layoutId={`podcast-card-${id}`}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 z-10">
        {/* Audio Player Section */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={thumbnailUrl || "/placeholder.svg?height=400&width=800"} 
                alt={title}
                height={400}
                width={800}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="w-full p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-lg text-gray-300 mb-4">{creator}</p>
                
                {/* Audio Controls */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3"
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white"
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </motion.button>
                    
                    <div className="text-sm text-white">
                      {audioUrl ? 
                        `${formatTime(currentTime)} / ${formatTime(duration)}` :
                        `${Math.floor(progress / 100 * 60)}:${String(Math.floor((progress / 100 * 60) % 60)).padStart(2, '0')}`
                      }
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      if (audioRef.current && duration > 0) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        const newTime = percent * duration;
                        audioRef.current.currentTime = newTime;
                      }
                    }}
                  >
                    <motion.div 
                      className="h-full bg-blue-500"
                      style={{ width: `${progress}%` }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                {listeners} listening
              </div>
              <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                {audioUrl ? "Podcast" : "Live"}
              </div>
            </div>
            
            <p className="text-gray-300">
              {/* Add description field to your Podcast model if you want to display it here */}
              Join this exciting conversation about the future of web3 and how creators can monetize their content through blockchain technology.
            </p>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="lg:col-span-1">
          <Comments roomId={id} />
        </div>
        
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-20"
        >
          <FaTimes />
        </motion.button>
      </div>
    </motion.div>
  );
}