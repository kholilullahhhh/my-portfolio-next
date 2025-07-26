"use client";

import { ReactNode } from "react";

export const GradientFadedBackground = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Full-window gradient overlays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Left gradient box */}
        <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent border-r border-gray-700/50" />

        {/* Right gradient box */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent border-l border-gray-700/50" />

        {/* Center highlight */}
        <div className="absolute inset-0 w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-gray-950/70 to-transparent border-x border-gray-700/30" />

        {/* Enhanced grid pattern with bolder lines and larger cells */}
        <div className="absolute inset-0">
          {/* Left grid with bolder lines */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]  // Larger grid cells
              bg-[linear-gradient(to_right,rgba(100,110,120,0.3)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(100,110,120,0.3)_1.5px,transparent_1.5px)]
              mask-gradient-right"
            style={{
              maskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
            }}
          />
          
          {/* Right grid with bolder lines */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]  // Larger grid cells
              bg-[linear-gradient(to_right,rgba(100,110,120,0.3)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(100,110,120,0.3)_1.5px,transparent_1.5px)]
              mask-gradient-left"
            style={{
              maskImage: 'linear-gradient(to left, black 70%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Content container */}
      <div className="relative px-6 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
};