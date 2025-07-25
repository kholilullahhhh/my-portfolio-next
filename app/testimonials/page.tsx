'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/lib/data';
import Image from 'next/image';

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Client Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            What clients say about working with me and the results we've achieved together.
            These testimonials reflect my commitment to delivering exceptional work and
            building lasting professional relationships.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 lg:p-12 relative overflow-hidden">
                {/* Background Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="h-24 w-24" />
                </div>
                
                <CardContent className="text-center space-y-8 relative z-10 p-0">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mx-1" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl text-muted-foreground italic leading-relaxed font-light">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-6 pt-8">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={`${testimonials[currentIndex].name} - ${testimonials[currentIndex].role} at ${testimonials[currentIndex].company}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-primary font-medium">
                        {testimonials[currentIndex].role}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">All Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setCurrentIndex(index)}
                className="cursor-pointer"
              >
                <Card className={`p-6 h-full hover:shadow-lg transition-all duration-300 ${
                  index === currentIndex ? 'ring-2 ring-primary' : ''
                }`}>
                  <CardContent className="p-0 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                    
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar}
                          alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}