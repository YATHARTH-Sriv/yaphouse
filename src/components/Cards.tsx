'use client';

import * as React from "react";
import { Card } from "@/components/ui/card";

interface CardDetails {
  id: number;
  logo: React.ReactNode;
  heading: string;
  detail: string;
}

export function Cardswithdetails({ cardDetails }: { cardDetails: CardDetails[] }) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardDetails.map((card) => (
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
