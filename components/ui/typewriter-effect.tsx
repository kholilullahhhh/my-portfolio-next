"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Word {
  text: string;
  className?: string;
}

export const TypewriterEffectSmooth = ({
  words,
  className,
}: {
  words: Word[];
  className?: string;
}) => {
  const renderWords = () => {
    return (
      <div>
        {words.map((word, idx) => {
          return (
            <motion.span
              key={word.text + idx}
              className={`${word.className || ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.2,
              }}
            >
              {word.text}
            </motion.span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-4xl font-bold text-center sm:text-5xl">
        {renderWords()}
      </div>
    </div>
  );
};
