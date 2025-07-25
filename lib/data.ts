import { Project, Skill, Testimonial } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js, featuring real-time inventory management, advanced search functionality, payment integration, and admin dashboard. The platform handles high traffic loads and provides seamless user experience across all devices.",
    image:
      "https://placehold.co/600x400/6366F1/FFFFFF?text=E-Commerce+Platform",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Secure mobile banking solution with biometric auth",
    longDescription:
      "A secure mobile banking application featuring biometric authentication, real-time transaction monitoring, budget tracking, and investment portfolio management. Built with React Native and implements industry-standard security protocols.",
    image: "https://placehold.co/600x400/F59E0B/FFFFFF?text=Banking+App",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Plaid API"],
    category: "mobile",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "4",
    title: "Design System Library",
    description: "Comprehensive component library and design system",
    longDescription:
      "A scalable design system and component library used across multiple products. Includes design tokens, accessible components, comprehensive documentation, and automated testing to ensure consistency and quality.",
    image: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Design+System",
    technologies: ["React", "Storybook", "TypeScript", "CSS-in-JS", "Jest"],
    category: "design",
    githubUrl: "https://github.com",
    featured: false,
  },
];

export const skills: Skill[] = [
  { name: "React", proficiency: 95, category: "frontend" },
  { name: "Next.js", proficiency: 90, category: "frontend" },
  { name: "Tailwind CSS", proficiency: 90, category: "frontend" },
  { name: "Node.js", proficiency: 80, category: "backend" },
  { name: "PostgreSQL", proficiency: 75, category: "backend" },
  { name: "Laravel", proficiency: 70, category: "backend" },
  { name: "Figma", proficiency: 85, category: "design" },
];
