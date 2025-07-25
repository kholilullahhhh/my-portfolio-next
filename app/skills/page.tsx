'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/lib/data';
import { Code, Database, Wrench, Palette } from 'lucide-react';

const skillCategories = { 
  frontend: { 
    title: 'Frontend Development', 
    icon: Code
  },
  backend: { 
    title: 'Backend Development', 
    icon: Database
  },
  tools: { 
    title: 'Tools & DevOps', 
    icon: Wrench
  },
  design: { 
    title: 'Design & UX', 
    icon: Palette
  },
};

export default function SkillsPage() {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills across different domains.
          </p>
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
            const categoryInfo = skillCategories[category as keyof typeof skillCategories];
            const IconComponent = categoryInfo.icon;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6 gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        {categoryInfo.title}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1 + skillIndex * 0.05 
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress 
                            value={skill.proficiency} 
                            className="h-1.5"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className={`
                  px-4 py-2 rounded-lg border bg-card text-sm font-medium
                  transition-all duration-200 cursor-default
                  ${skill.proficiency >= 90 ? 'border-green-500/30' :
                    skill.proficiency >= 80 ? 'border-blue-500/30' :
                    skill.proficiency >= 70 ? 'border-yellow-500/30' :
                    'border-muted'
                  }`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold mb-4">Proficiency Levels</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { range: '90-100%', label: 'Expert', color: 'bg-green-500/20 border-green-500/50' },
              { range: '80-89%', label: 'Advanced', color: 'bg-blue-500/20 border-blue-500/50' },
              { range: '70-79%', label: 'Intermediate', color: 'bg-yellow-500/20 border-yellow-500/50' },
              { range: '60-69%', label: 'Beginner', color: 'bg-muted border' },
            ].map((level, index) => (
              <motion.div
                key={level.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className={`px-3 py-1.5 rounded-full text-sm border ${level.color}`}
              >
                {level.label} <span className="text-muted-foreground text-xs">({level.range})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}