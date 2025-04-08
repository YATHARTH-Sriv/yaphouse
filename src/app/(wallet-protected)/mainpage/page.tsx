'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFire, FaRegClock, FaStar } from 'react-icons/fa';
import { AnimatedBackground } from '@/components/Animated-background';
import { AudioRoomGrid } from '@/components/Audioroom';
import Image from 'next/image';

export default function NFTMarketPage() {
  const { wallet } = useWallet();
  // const walletAddress = wallet?.adapter.publicKey?.toBase58();
  const [activeTab, setActiveTab] = React.useState('trending');
  
  const tabs = [
    { id: 'trending', label: 'Trending', icon: <FaFire /> },
    { id: 'new', label: 'New', icon: <FaRegClock /> },
    { id: 'featured', label: 'Featured', icon: <FaStar /> },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <motion.h1 
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              YapHouse
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover audio rooms and earn while you listen
            </motion.p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rooms..."
                className="bg-gray-800/50 border border-white/10 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <WalletMultiButton className="!bg-blue-500 hover:!bg-blue-600 !rounded-full !transition-all !duration-300" />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Featured Room */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Featured Room</h2>
          <div className="relative rounded-xl overflow-hidden">
            <div className="aspect-[21/9] w-full">
              <Image
                // src="/placeholder.svg?height=400&width=900"
                src='/mock-data/learneth.png' 
                height="400"
                width="900"
                alt="Featured Room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    LIVE
                  </div>
                  <div className="bg-gray-800/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaFire className="text-yellow-500" />
                    2.4K listening
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Web3 Revolution: The Future of Digital Ownership</h3>
                <p className="text-gray-300 mb-4">With CryptoVisionary & Web3Experts</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 font-medium"
                >
                  <FaFire />
                  Join Room
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Audio Rooms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Popular Rooms</h2>
          <AudioRoomGrid />
        </motion.div>
      </div>
    </div>
  );
}