'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '@/components/landingpage-components/Animated-background';
import { AudioRoomGrid } from '@/components/audio/Audioroom';
import { RoomPlayer } from '@/components/room/Roomplayer';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaFire, FaRegClock, FaStar, FaHeadphones } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Define podcast interface
interface Podcast {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  audioUrl: string;
  createdAt: string;
}

export default function NFTMarketPage() {
  const { wallet } = useWallet();
  const [activeTab, setActiveTab] = useState('trending');
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const router=useRouter()
  const tabs = [
    { id: 'trending', label: 'Trending', icon: <FaFire /> },
    { id: 'new', label: 'New', icon: <FaRegClock /> },
    { id: 'featured', label: 'Featured', icon: <FaStar /> },
  ];
  useEffect(() => {
      const getadd = async () => {
        const publicadd = await wallet?.adapter.publicKey?.toBase58();
        if (publicadd) {
          router.push("/mainpage");
        }
      };
      getadd();
    }, [wallet?.adapter.publicKey, router]);
  

  // Fetch podcasts from DB
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch('/api/podcasts');
        if (!res.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await res.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);
  
  const handlePodcastClick = (podcastId: string) => {
    setSelectedPodcast(podcastId);
  };
  
  const handleClosePodcast = () => {
    setSelectedPodcast(null);
  };
  
  const selectedPodcastData = podcasts.find(podcast => podcast._id === selectedPodcast);
  
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
            <Link href="/create-podcast">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full px-6 py-2 flex items-center gap-2 font-medium shadow-lg hover:shadow-blue-500/25"
              >
                Create Room
              </motion.button>
            </Link>
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
        
        {/* Audio Rooms Grid - Keep existing hardcoded rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Popular Rooms</h2>
          <AudioRoomGrid />
        </motion.div>

        {/* New Added Podcasts Section with RoomPlayer functionality */}
        {podcasts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 relative"
          >
            <h2 className="text-2xl font-bold mb-6">Your Created Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map((podcast) => (
                <motion.div
                  key={podcast._id}
                  layoutId={`podcast-card-${podcast._id}`}
                  onClick={() => handlePodcastClick(podcast._id)}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 border border-white/10 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm hover:shadow-blue-500/10 transition-all h-full cursor-pointer group"
                >
                  <div className="aspect-video w-full relative">
                    <div className="w-full h-full">
                      {podcast.thumbnailUrl ? (
                        <Image 
                          src={podcast.thumbnailUrl} 
                          alt={podcast.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                          <FaHeadphones className="text-4xl text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full p-4 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FaFire className="text-white text-xl" />
                      </motion.div>
                      
                      <div className="w-full p-4">
                        <h3 className="text-lg font-bold text-white truncate">{podcast.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 line-clamp-2">{podcast.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          Room
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(podcast.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* RoomPlayer for podcasts */}
            <AnimatePresence>
              {selectedPodcast && selectedPodcastData && (
                <RoomPlayer
                  id={selectedPodcastData._id}
                  title={selectedPodcastData.title}
                  creator="Creator" // You may want to add creator field to your Podcast model
                  listeners={Math.floor(Math.random() * 1000)} // Random listener count for demo
                  thumbnailUrl={selectedPodcastData.thumbnailUrl || "/placeholder.svg"}
                  onClose={handleClosePodcast}
                  audioUrl={selectedPodcastData.audioUrl} // Pass audio URL to the RoomPlayer
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}