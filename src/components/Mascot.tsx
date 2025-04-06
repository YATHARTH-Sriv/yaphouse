'use client';

import { Player } from '@lottiefiles/react-lottie-player';

export default function Mascot() {

  return (
    <div
      className=" w-28 h-30 cursor-pointer"
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
