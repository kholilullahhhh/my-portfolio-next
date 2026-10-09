"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { GradientFadedBackground } from "@/components/ui/gradient-faded-box";
import { ScrambleText } from "@/components/home/scramble-text";
import Link from "next/link";
import Lottie from "lottie-react";
import developerAnimation from "@/public/8-bit Cat.json";
import { TypeAnimation } from "react-type-animation";

export default function HomePage() {
  return (
    <GlowingStarsBackgroundCard className="min-h-screen">
      <GradientFadedBackground>
        {/* Hero Section */}
        <section className="relative min-h-screen md:h-screen md:overflow-hidden px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto gap-8 md:gap-0 py-8 md:py-0">
          {/* Left Content */}
          <div className="relative z-10 w-full md:w-1/2 md:h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left mb-8 md:mb-0"
            >
              <motion.p
                className="eyebrow mb-5 max-w-xl mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, there...
              </motion.p>

              <motion.h1
                className="relative text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <ScrambleText
                    text="Kholilullah"
                    delay={400}
                    speed={55}
                    repeatInterval={7000}
                  />
                </span>
                <br />
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "Tech Enthusiast",
                    2000,
                    "Order Some Coffee?",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="block text-2xl md:text-4xl lg:text-5xl"
                />
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-6 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-foreground font-medium">
                  Undergraduate of Informatics Engineering
                </span>{" "}
                at Universitas Dipa Makassar. Enthusiastic about continuous
                learning and building impactful open source projects.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button asChild size="lg" className="btn-navy">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href="/stats">Dashboard</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Animation */}
          <div className="relative z-10 flex w-full md:w-1/2 items-center justify-center mt-8 md:mt-0 md:h-full">
            <div className="relative w-full max-w-[480px] lg:max-w-[400px] xl:max-w-[600px] md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
              <Lottie
                animationData={developerAnimation}
                loop={true}
                className="w-full h-auto scale-110 md:scale-125"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  transformOrigin: "center",
                }}
              />
            </div>
          </div>

          {/* Social Links - Fixed at bottom on desktop, inline on mobile */}
          <motion.div
            className="w-full flex justify-center md:fixed md:bottom-8 md:left-0 md:right-0 md:w-auto mb-8 md:mb-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ pointerEvents: "auto" }}
          >
            <motion.div
              className="flex space-x-4 rounded-full p-2 border border-muted/50 bg-background/60 backdrop-blur-md"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/kholilullahhhh",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/muhammad-kholilullah-8b7832276/",
                  label: "LinkedIn",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/kholilullahhh_",
                  label: "Instagram",
                },
              ].map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-background/20"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </GradientFadedBackground>
    </GlowingStarsBackgroundCard>
  );
}