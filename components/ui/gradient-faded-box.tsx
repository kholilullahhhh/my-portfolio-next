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
        {/* Light mode: very subtle side gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-muted/30 via-muted/10 to-transparent dark:from-gray-900/70 dark:via-gray-900/50 dark:to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-muted/30 via-muted/10 to-transparent dark:from-gray-900/70 dark:via-gray-900/50 dark:to-transparent" />

        {/* Center highlight */}
        <div className="absolute inset-0 w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-muted/5 to-transparent dark:via-gray-950/40" />

        {/* Grid pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute left-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]
              bg-[linear-gradient(to_right,rgba(200,210,220,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,210,220,0.12)_1px,transparent_1px)]
              dark:bg-[linear-gradient(to_right,rgba(100,110,120,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,110,120,0.2)_1px,transparent_1px)]"
            style={{
              maskImage: 'linear-gradient(to right, black 60%, transparent 90%)'
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-[40%] 
              bg-[size:100px_100px]
              bg-[linear-gradient(to_right,rgba(200,210,220,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,210,220,0.12)_1px,transparent_1px)]
              dark:bg-[linear-gradient(to_right,rgba(100,110,120,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,110,120,0.2)_1px,transparent_1px)]"
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
