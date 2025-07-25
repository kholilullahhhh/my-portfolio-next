"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/common/footer";
import { Calendar, MapPin, Award, Users } from "lucide-react";

const highlights = [
  { icon: Calendar, label: "5+ Years Experience", value: "Since 2019" },
  { icon: Award, label: "Projects Completed", value: "50+" },
  { icon: Users, label: "Satisfied Clients", value: "20+" },
  { icon: MapPin, label: "Based In", value: "San Francisco" },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "PostgreSQL",
];

const timeline = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    description:
      "Leading development of enterprise applications using React and Node.js.",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    description:
      "Built scalable web applications and mentored junior developers.",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Specialized in creating responsive and interactive user interfaces.",
  },
  {
    year: "2019",
    title: "Junior Developer",
    company: "WebSolutions",
    description:
      "Started my journey in web development with HTML, CSS, and JavaScript.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate full-stack developer with expertise in modern web
            technologies and a keen eye for exceptional user experiences. I
            believe in creating digital solutions that make a real difference.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold text-lg mb-1">
                    {highlight.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {highlight.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My journey into web development began in 2019 when I discovered
                the power of code to bring ideas to life. What started as
                curiosity quickly became a passion for creating digital
                experiences that solve real problems.
              </p>
              <p>
                Over the years, I've had the privilege of working with diverse
                teams and clients, from early-stage startups to established
                enterprises. Each project has taught me something new and
                reinforced my belief that great software is built through
                collaboration, attention to detail, and continuous learning.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source projects, or sharing knowledge with
                the developer community through blog posts and mentoring.
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
