"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

interface RoomCardProps {
  id: string;
  title: string;
  creator: string;
  listeners: number;
  thumbnailUrl: string;
  onClick: () => void;
}

export function RoomCard({ 
  id, 
  title, 
  creator, 
  listeners, 
  thumbnailUrl, 
  onClick 
}: RoomCardProps) {
  return (
    <motion.div
      layoutId={`room-card-${id}`}
      onClick={onClick}
      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-blue-500/20 cursor-pointer group"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={thumbnailUrl || "/placeholder.svg?height=200&width=350"} 
            height={200}
            width={350}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full p-4 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <FaPlay className="text-white text-xl" />
          </motion.div>
        </div>
        
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <FaUserFriends className="text-blue-400" />
          <span className="text-white text-xs font-medium">{listeners}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-300">{creator}</p>
      </div>
    </motion.div>
  );
}