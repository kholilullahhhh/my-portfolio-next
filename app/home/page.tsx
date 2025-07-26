"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { GradientFadedBackground } from "@/components/ui/gradient-faded-box";
import Link from "next/link";

export default function HomePage() {
  return (
    <GlowingStarsBackgroundCard className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <GradientFadedBackground>
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen px-4 sm:px-6 lg:px-8 flex flex-col justify-center max-w-7xl mx-auto">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h2
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, there
              </motion.h2>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kholilullah
                </span>
                <br />
                Full Stack Developer
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Undergraduate of Informatics Engineering at Universitas Dipa
                Makassar.
                <br />
                Enthusiastic about continuous learning and building impactful open
                source projects. Experienced in software engineering with a focus
                on development and operations.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button asChild size="lg">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links - Fixed at bottom */}
            <motion.div
              className="fixed bottom-8 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex space-x-4 bg-background/80 backdrop-blur-sm rounded-full p-2 border border-muted/50">
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
                    className="rounded-full"
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </GradientFadedBackground>
    </GlowingStarsBackgroundCard>
  );
}