"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface CommentsProps {
  roomId: string;
}


const mockComments: Comment[] = [
  {
    id: '1',
    user: 'CryptoWhale',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'This conversation is 🔥! Love the insights on NFT marketplaces.',
    timestamp: '2 min ago'
  },
  {
    id: '2',
    user: 'SolanaBuilder',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'Question: How do you see the future of audio NFTs evolving?',
    timestamp: '5 min ago'
  },
  {
    id: '3',
    user: 'Web3Enthusiast',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'First time here, the platform is amazing! So smooth.',
    timestamp: '7 min ago'
  },
  {
    id: '4',
    user: 'TokenMaster',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'Anyone else bullish on creator economies? This is the future!',
    timestamp: '10 min ago'
  }
];

export function Comments({ roomId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: 'You',
      avatar: '/placeholder.svg?height=40&width=40',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl border border-white/10 shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white">Live Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3"
            >
              <div className="flex-shrink-0">
                <Image
                  width={40}
                  height={40}
                  src={comment.avatar} 
                  alt={comment.user} 
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-400">{comment.user}</span>
                  <span className="text-xs text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <FaPaperPlane size={14} />
            <span>Send</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}