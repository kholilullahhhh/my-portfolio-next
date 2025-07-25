"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/common/footer";
import { Badge } from "@/components/ui/badge";

import { Calendar, MapPin, Award, Users } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    label: "SMA Negeri 9 Gowa",
    year: "2020 - 2023",
    description:
      "Graduated with a focus on Science and Mathematics. Developed a strong foundation in analytical thinking and problem-solving skills.",
  },
  {
    icon: Award,
    label: "Universitas DIPA Makassar",
    year: "2023 - Present",
    description:
      "Specialized in Software Engineering with a strong emphasis on Back-End Development. Studied core subjects such as Data Structures, Algorithms, Object-Oriented Programming, and Software Engineering.",
  },
];

const techStack = [
  "Next.js",
  "React Native",
  "Node.js",
  "Laravel",
  "PostgreSQL",
  "MySQL",
  "Git",
  "Git Hub",
];

const timeline = [
  {
    year: "2025",
    title: "Full Stack Developer",
    company: "TechCorp Inc.",
    description:
      "Leading development of enterprise applications using React and Node.js.",
  },
  {
    year: "2024",
    title: "Backend Developer",
    company: "StartupXYZ",
    description:
      "Built scalable web applications and mentored junior developers.",
  },
  {
    year: "2023",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Specialized in creating responsive and interactive user interfaces.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I am a passionate full-stack developer and an active student at
            <strong> Universitas Dipa Makassar</strong>, majoring in
            <strong> Informatics Engineering</strong>. With a strong foundation
            in both front-end and back-end development, I enjoy building modern,
            scalable web applications that not only work well but also provide
            excellent user experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6">My Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hi, my name is Muhammad Kholilullah. My journey into software
                development began in 2022, driven by a deep curiosity about how
                websites and digital products are created.
              </p>
              <p>
                As a student of Informatics Engineering at{" "}
                <strong>Universitas Dipa Makassar</strong>, I've had the
                opportunity to deepen my understanding of software development,
                from algorithms and data structures to back-end systems and
                user-centered design.
              </p>
              <p>
                Outside of academic life, I enjoy exploring new technologies,
                contributing to open source, and connecting with the developer
                community through online platforms and mentoring others who are
                just starting out in tech.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    I work with modern technologies to build scalable and
                    maintainable applications:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + index * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-sm py-1 px-3"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Education</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="border-l-4 border-primary/20 pl-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <highlight.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-lg">{highlight.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {highlight.year}
                </p>
                <p className="mt-2 text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative flex items-center mb-8 last:mb-0"
              >
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-border" />

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                {/* Content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-8 text-right" : "ml-auto pl-8"
                  }`}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-primary font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <div className="text-muted-foreground font-medium mb-2">
                        {item.company}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
