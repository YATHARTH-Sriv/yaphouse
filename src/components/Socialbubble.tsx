"use client";

import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';

const iconarray=[
    {
        id:"1",
        logo:<FaYoutube className="text-lg text-red-600" />,
    },
    {
        id:"2",
        logo:<FaTwitter className="text-lg text-blue-600" />,
    },
    {
        id:"3",
        logo:<FaInstagram className="text-lg text-pink-700" />,
    },
    {
        id:"4",
        logo:<FaTiktok className="text-lg text-black" />,
    }
]

function SocialBubbleLeft() {
  return (
            <motion.div 
            className="relative w-60 h-60"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/80 to-purple-500/80 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-lg relative overflow-hidden border border-white/20">
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-full blur-sm"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-md"></div>
              
              <div className="text-center z-10">
                <p className="text-md font-semibold text-white mb-3">Why platforms & creators should earn from your attention</p>
                <div className="flex justify-center gap-3">
                  {iconarray.map((icon) => (
                    <motion.div
                      key={icon.id}
                      whileHover={{ scale: 1.2 }}
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                    >
                      {/* <Icon className="text-lg text-white" /> */}
                      {icon.logo}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
      
            <motion.div 
              className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-blue-400/80 border border-white/20"
              animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-400/80 border border-white/20"
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
  );
}

function SocialBubbleRight() {
    return (
              <motion.div 
              className="relative w-60 h-60"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            >
              
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/80 to-purple-500/80 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-lg relative overflow-hidden border border-white/20">
                
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-md"></div>
                
                
                <div className="text-center z-10">
                  <p className="text-md font-semibold text-white mb-3">You are who create engagment why to do it for free?</p>
                  <div className="flex justify-center gap-3">
                  {iconarray.map((icon) => (
                    <motion.div
                      key={icon.id}
                      whileHover={{ scale: 1.2 }}
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                    >
                      {/* <Icon className="text-lg text-white" /> */}
                      {icon.logo}
                    </motion.div>
                  ))}
                  </div>
                </div>
              </div>
        
            
              <motion.div 
                className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-blue-400/80 border border-white/20"
                animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-400/80 border border-white/20"
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
    );
  }

export { SocialBubbleLeft, SocialBubbleRight };