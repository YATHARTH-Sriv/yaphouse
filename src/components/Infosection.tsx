'use client';

import React from 'react';

function InfoSection(){
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="relative flex flex-col items-center">

        {/* Top Section */}
        <div className="relative w-full max-w-3xl p-8 mb-20 shadow-blue-500/60 shadow-lg hover:shadow-yellow-500/60 transition-all duration-300 border border-white/30 rounded-3xl bg-black/40 backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            What is YapHouse
          </h2>
          <p className="text-lg text-gray-300 text-center">
            People spend hours listening to podcasts and Twitter spaces but dont get compensated for this time.
          </p>

          {/* Decorative Arrows */}
          <div className="hidden md:block absolute -bottom-20 left-1/4 transform -translate-x-1/2 rotate-45">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path d="M10 10 L110 110" stroke="white" strokeWidth="2" />
              <path d="M100 110 L110 110 L110 100" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="hidden md:block absolute -bottom-20 right-1/4 transform translate-x-1/2 -rotate-45">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path d="M110 10 L10 110" stroke="white" strokeWidth="2" />
              <path d="M10 110 L20 110 L10 100" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Creator & Audience Sections */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-white/30 rounded-3xl shadow-blue-500/60 hover:shadow-yellow-500/60 transition-all duration-300 bg-black/40 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              For Creators
            </h3>
            <p className="text-lg text-gray-300">
              Creators can host their own audio spaces, engage with fans, and earn from their community.
            </p>
          </div>

          <div className="p-8 border border-white/30 rounded-3xl shadow-blue-500/60 hover:shadow-yellow-500/60 transition-all duration-300 bg-black/40 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              For Audiences
            </h3>
            <p className="text-lg text-gray-300">
              Audiences earn while listening, and can engage with creators through NFTs and community features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
