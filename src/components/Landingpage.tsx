'use client';

import React, { useEffect } from 'react';
// import Mascot from '@/components/Mascot';
import { Cardswithdetails } from '@/components/landingpage-components/Cards';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AccordionDemo } from './landingpage-components/Accordian';
import { SocialBubbleLeft, SocialBubbleRight } from './landingpage-components/Socialbubble';
import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import InfoSection from './landingpage-components/Infosection';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

const socials = [
  {
    id: 1,
    logo: <FaTwitter className="text-xl text-blue-500" />,
    link: "https://x.com/yatharth_sriv"
  },
  {
    id: 2,
    logo: <FaGithub className="text-xl text-white hover:text-black" />,
    link: "https://github.com/yatharth-sriv"
  }
];

export default function Landingpage() {
  const { wallet } = useWallet();
  const route = useRouter();
  
  useEffect(() => {
    const getadd = async () => {
      const publicadd = await wallet?.adapter.publicKey?.toBase58();
      if (publicadd) {
        route.push("/mainpage");
      }
    };
    getadd();
  }, [wallet?.adapter.publicKey, route]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-start relative overflow-hidden pb-24">

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -z-10"></div>

      {/* Floating Banner */}
      <div className="fixed top-6 w-full flex justify-center z-20">
        <div className="border border-yellow-500/30 rounded-full px-8 py-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm shadow-lg">
          <span className="text-gray-200 text-sm font-medium">Get Ready To Earn For Yapping...</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 w-full max-w-7xl mt-32 px-6 z-10 gap-y-10 md:gap-0">
        {/* Social Left */}
        <div className="hidden md:flex items-center justify-center md:justify-start">
          <SocialBubbleLeft />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-400 flex items-center gap-3">
            {/* <Mascot /> */}
            YapHouse
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Do You Yap A Lot? Well, Its Time To Get Paid For It!
          </p>
          <WalletMultiButton className="!bg-yellow-400 hover:!bg-yellow-500 !text-black !font-semibold !text-lg !py-3 !px-10 !rounded-lg !transition-all !duration-300 shadow-lg" />
        </div>

        {/* Social Right */}
        <div className="hidden md:flex items-center justify-center md:justify-end">
          <SocialBubbleRight />
        </div>
      </div>

      {/* Cards */}
      <div className="w-full mt-40 px-6">
        <Cardswithdetails />
      </div>

      {/* Info Section */}
      <div className="w-full mt-20 px-6">
        <InfoSection />
      </div>

      {/* FAQ Section */}
      <div className="w-full md:w-1/2 mt-32 px-6 mx-auto">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <AccordionDemo />
      </div>

      {/* Footer Socials */}
      <div className="w-full flex justify-center gap-4 mt-12">
        {socials.map(({ id, logo, link }) => (
          <Link key={id} href={link} target="_blank" className="hover:bg-white/10 p-3 rounded-full transition-all duration-300">
            {logo}
          </Link>
        ))}
      </div>
    </div>
  );
}