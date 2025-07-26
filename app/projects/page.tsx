'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/common/footer';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";

import { projects } from '@/lib/data';
import { Project } from '@/types';
import Image from 'next/image';

const categories = ['all', 'web', 'mobile'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    project => selectedCategory === 'all' || project.category === selectedCategory
  );

  return (
    <GlowingStarsBackgroundCard className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Featured Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring innovative solutions and cutting-edge technologies.
            Each project represents a unique challenge and demonstrates my commitment to excellence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize px-6 py-2 rounded-full transition-all duration-300"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.description}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      >
                        View Details
                      </Button>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" className="flex-1 group/btn">
                          <ExternalLink className="h-3 w-3 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="flex-1 group/btn">
                          <Github className="h-3 w-3 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} - Detailed view of ${selectedProject.description}`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                      <Badge variant="outline" className="capitalize">
                        {selectedProject.category}
                      </Badge>
                    </div>
                    {selectedProject.featured && (
                      <Badge className="bg-yellow-500 text-yellow-900">Featured Project</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t">
                      {selectedProject.liveUrl && (
                        <Button asChild className="flex-1">
                          <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button variant="outline" asChild className="flex-1">
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </GlowingStarsBackgroundCard>
  );
}