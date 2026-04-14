"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface StoreMapProps {
  highlightedAisle: string | null;
  highlightedFloor?: string | null;
}

export default function StoreMap({ highlightedAisle, highlightedFloor }: StoreMapProps) {
  const [activeFloor, setActiveFloor] = useState<string>("Floor 1");

  useEffect(() => {
    if (highlightedFloor) {
      setActiveFloor(highlightedFloor);
    }
  }, [highlightedFloor]);

  const floors = ["Floor 1", "Floor 2"];
  // Simple representation of a store layout
  const aisles = [
    { id: "Aisle 1", x: 40, y: 40, width: 60, height: 160 },
    { id: "Aisle 2", x: 120, y: 40, width: 60, height: 160 },
    { id: "Aisle 3", x: 200, y: 40, width: 60, height: 160 },
    { id: "Aisle 4", x: 40, y: 220, width: 60, height: 160 },
    { id: "Aisle 5", x: 120, y: 220, width: 60, height: 160 },
    { id: "Aisle 6", x: 200, y: 220, width: 60, height: 160 },
  ];

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Floor Tabs */}
      <div className="flex gap-2 p-1 bg-foreground/5 rounded-xl self-start w-full">
        {floors.map(floor => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeFloor === floor ? 'bg-primary text-white shadow-md' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/10'}`}
          >
            {floor}
          </button>
        ))}
      </div>

      <div className="w-full aspect-square md:aspect-[3/4] bg-background/50 rounded-2xl relative overflow-hidden flex items-center justify-center p-4 border border-white/10 shadow-inner flex-1">
      <svg
        viewBox="0 0 300 420"
        className="w-full h-full max-w-sm drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Store Outline */}
        <rect x="10" y="10" width="280" height="400" rx="8" stroke="currentColor" strokeWidth="4" className="text-foreground/20" fill="var(--card-bg)" />
        
        {/* Entrance */}
        <path d="M 120 410 L 180 410" stroke="currentColor" strokeWidth="6" className="text-secondary" strokeLinecap="round" />
        <text x="150" y="395" fontSize="12" fill="currentColor" textAnchor="middle" className="text-foreground/50 font-medium">ENTRANCE</text>

        {/* Checkout */}
        <rect x="230" y="350" width="40" height="30" rx="4" fill="currentColor" className="text-primary/30" />
        <text x="250" y="370" fontSize="10" fill="currentColor" textAnchor="middle" className="text-foreground/70 font-medium">PAY</text>

        {/* Aisles */}
        {aisles.map((aisle) => {
          const isHighlighted = highlightedAisle === aisle.id && activeFloor === highlightedFloor;

          return (
            <g key={aisle.id}>
              <motion.rect
                x={aisle.x}
                y={aisle.y}
                width={aisle.width}
                height={aisle.height}
                rx="6"
                initial={false}
                animate={{
                  fill: isHighlighted ? "var(--brand-primary)" : "var(--brand-primary)",
                  fillOpacity: isHighlighted ? 1 : 0.1,
                  stroke: isHighlighted ? "var(--brand-primary)" : "currentColor",
                  strokeOpacity: isHighlighted ? 1 : 0.2,
                }}
                transition={{ duration: 0.3 }}
                strokeWidth="2"
              />
              <text
                x={aisle.x + aisle.width / 2}
                y={aisle.y + aisle.height / 2}
                fontSize="12"
                fill={isHighlighted ? "#ffffff" : "currentColor"}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`font-semibold transition-colors duration-300 ${!isHighlighted ? 'text-foreground/60' : ''}`}
                style={{ writingMode: 'vertical-rl', transform: `rotate(180deg)`, transformOrigin: `${aisle.x + aisle.width / 2}px ${aisle.y + aisle.height / 2}px` }}
              >
                {aisle.id.replace('Aisle ', 'A')}
              </text>
            </g>
          );
        })}

        {/* Animated Highlight Indicator (Ping) */}
        {aisles.map((aisle) => {
          if (highlightedAisle !== aisle.id || activeFloor !== highlightedFloor) return null;
          return (
            <g key={`highlight-${aisle.id}`}>
              <motion.circle
                cx={aisle.x + aisle.width / 2}
                cy={aisle.y - 15}
                r="6"
                fill="var(--brand-secondary)"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <circle
                cx={aisle.x + aisle.width / 2}
                cy={aisle.y - 15}
                r="4"
                fill="var(--brand-secondary)"
              />
            </g>
          );
        })}
      </svg>
    </div>
    </div>
  );
}
