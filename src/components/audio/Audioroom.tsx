"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RoomCard } from '../room/Roomcard';
import { RoomPlayer } from '../room/Roomplayer';


const mockRooms = [
  {
    id: '1',
    title: 'The Future of Web3 & Creator Economy',
    creator: 'CryptoInfluencer',
    listeners: 1243,
    thumbnailUrl: '/mock-data/mainone.jpg'
  },
  {
    id: '2',
    title: 'NFT Market Trends & Analysis',
    creator: 'NFTExpert',
    listeners: 856,
    thumbnailUrl: '/mock-data/tom.png'
  },
  {
    id: '3',
    title: 'Solana Development Workshop',
    creator: 'SolanaBuilder',
    listeners: 621,
    thumbnailUrl: '/mock-data/joe.jpg'
  },
  {
    id: '4',
    title: 'Crypto Market Discussion',
    creator: 'TokenAnalyst',
    listeners: 1589,
    thumbnailUrl: '/mock-data/courage.png'
  },
  {
    id: '5',
    title: 'DeFi Strategies for 2023',
    creator: 'DeFiWhale',
    listeners: 732,
    thumbnailUrl: '/mock-data/defi.png'
  },
  {
    id: '6',
    title: 'Gaming & Metaverse Future',
    creator: 'MetaGamer',
    listeners: 945,
    thumbnailUrl: '/mock-data/rick.png'
  }
];

export function AudioRoomGrid() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  
  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId);
  };
  
  const handleCloseRoom = () => {
    setSelectedRoom(null);
  };
  
  const selectedRoomData = mockRooms.find(room => room.id === selectedRoom);
  
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            title={room.title}
            creator={room.creator}
            listeners={room.listeners}
            thumbnailUrl={room.thumbnailUrl}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {selectedRoom && selectedRoomData && (
          <RoomPlayer
            id={selectedRoomData.id}
            title={selectedRoomData.title}
            creator={selectedRoomData.creator}
            listeners={selectedRoomData.listeners}
            thumbnailUrl={selectedRoomData.thumbnailUrl}
            onClose={handleCloseRoom}
          />
        )}
      </AnimatePresence>
    </div>
  );
}