'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';

export default function Mascot() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=" w-28 h-30 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      {/* Lottie Mascot */}
      <Player
        autoplay={false}
        loop
        hover
        src="/animation.json"
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
