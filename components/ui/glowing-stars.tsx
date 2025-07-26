"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export const GlowingStarsBackgroundCard = ({
  children,
  className,
  starCount = 500, // Increased to 500 stars
}: {
  children: ReactNode;
  className?: string;
  starCount?: number;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stars, setStars] = useState<
    Array<{
      id: number;
      size: number;
      speed: number;
      initialX: number;
      initialY: number;
      travelDistance: number;
      twinkleSpeed: number;
    }>
  >([]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        size: Math.random() * 1.2 + 0.3, // Smaller stars (0.3-1.5px)
        speed: Math.random() * 1.5 + 0.5,
        initialX: Math.random() * dimensions.width,
        initialY: Math.random() * dimensions.height,
        travelDistance: Math.random() * 400 + 100,
        twinkleSpeed: Math.random() * 3 + 1, // Random twinkle speed
      }));
      setStars(newStars);
    }
  }, [dimensions, starCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(0,0,0,0)]"
        />

        {/* Stars with twinkle effect */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              opacity: 0,
              x: star.initialX,
              y: star.initialY,
            }}
            animate={{
              opacity: [0, 0.3, 0.8, 0.3, 0], // Twinkling sequence
              x: [
                star.initialX,
                star.initialX + (Math.random() * star.travelDistance - star.travelDistance/2),
                star.initialX + (Math.random() * star.travelDistance - star.travelDistance/2),
              ],
              y: [
                star.initialY,
                star.initialY + (Math.random() * star.travelDistance - star.travelDistance/2),
                star.initialY + (Math.random() * star.travelDistance - star.travelDistance/2),
              ],
            }}
            transition={{
              duration: Math.random() * 8 + 4, // Slower overall movement
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              // Independent twinkle animation
              animation: `twinkle ${star.twinkleSpeed}s infinite alternate`,
            }}
          />
        ))}
      </div>
      {children}

      {/* Add twinkle animation to global styles */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};