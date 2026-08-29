"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const GlowingStarsBackgroundCard = ({
  children,
  className,
  starCount = 500,
}: {
  children: ReactNode;
  className?: string;
  starCount?: number;
}) => {
  const { theme } = useTheme();
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
        size: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 1.5 + 0.5,
        initialX: Math.random() * dimensions.width,
        initialY: Math.random() * dimensions.height,
        travelDistance: Math.random() * 400 + 100,
        twinkleSpeed: Math.random() * 3 + 1,
      }));
      setStars(newStars);
    }
  }, [dimensions, starCount]);

  const isDark = theme === "dark";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.04),rgba(0,0,0,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(0,0,0,0))]"
        />

        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              opacity: 0,
              x: star.initialX,
              y: star.initialY,
            }}
            animate={{
              opacity: [0, 0.3, 0.8, 0.3, 0],
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
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className={`absolute rounded-full ${isDark ? "bg-white" : "bg-foreground/8"}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.twinkleSpeed}s infinite alternate`,
            }}
          />
        ))}
      </div>
      {children}

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
