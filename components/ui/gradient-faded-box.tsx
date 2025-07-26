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
        {/* Softer gradient boxes */}
        <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-gray-900/70 via-gray-900/50 to-transparent" />

        {/* Center highlight with reduced intensity */}
        <div className="absolute inset-0 w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-gray-950/40 to-transparent" />

        {/* Grid pattern with adjusted opacity */}
        <div className="absolute inset-0">
          <div 
            className="absolute left-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]
              bg-[linear-gradient(to_right,rgba(100,110,120,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,110,120,0.2)_1px,transparent_1px)]
              mask-gradient-right"
            style={{
              maskImage: 'linear-gradient(to right, black 60%, transparent 90%)'
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]
              bg-[linear-gradient(to_right,rgba(100,110,120,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,110,120,0.2)_1px,transparent_1px)]
              mask-gradient-left"
            style={{
              maskImage: 'linear-gradient(to left, black 60%, transparent 90%)'
            }}
          />
        </div>
      </div>

      {/* Content container */}
      <div className="relative px-6 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
};