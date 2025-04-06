'use client';

import * as React from "react";
import { Card } from "@/components/ui/card";
import { RiUserCommunityLine } from "react-icons/ri";
import { SiSolana } from "react-icons/si";
import {FaWallet } from 'react-icons/fa';
const cardDetailsone = [
  {
    id: 1,
    logo: <SiSolana className="text-4xl text-yellow-400" />,
    heading: "Built on Solana",
    detail: "We are on Solana  fast transactions and low fees."
  },
  {
    id: 2,
    logo: <FaWallet className="text-4xl text-yellow-400" />,
    heading: "Earn through Yapping",
    detail: "Whats the point of yapping if you're not getting paid?"
  },
  {
    id: 3,
    logo: <RiUserCommunityLine className="text-4xl text-yellow-400" />,
    heading: "Community Building",
    detail: "Creators can build strong relationships with fans and earn via NFTs."
  }
];

export function Cardswithdetails() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardDetailsone.map((card) => (
          <Card
            key={card.id}
            className="bg-black border border-blue-500/20 p-6 rounded-xl hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="shrink-0">{card.logo}</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{card.heading}</h3>
                <p className="text-sm text-gray-300">{card.detail}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
