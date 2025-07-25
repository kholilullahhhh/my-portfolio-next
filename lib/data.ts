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
    id: "2",
    title: "AI Dashboard Analytics",
    description: "Data visualization dashboard with AI insights",
    longDescription:
      "An intelligent analytics dashboard that leverages machine learning to provide actionable insights. Features real-time data processing, customizable widgets, and predictive analytics to help businesses make data-driven decisions.",
    image: "https://placehold.co/600x400/10B981/FFFFFF?text=AI+Dashboard",
    technologies: ["React", "D3.js", "Python", "TensorFlow", "FastAPI"],
    category: "data",
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

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Outstanding work on our e-commerce platform. The attention to detail and technical expertise exceeded our expectations. Delivered on time and within budget.",
    avatar: "https://placehold.co/100x100/6366F1/FFFFFF?text=SJ",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Inc",
    content:
      "Exceptional developer with deep understanding of modern web technologies. The analytics dashboard transformed how we visualize our data.",
    avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=MC",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Design Director",
    company: "Creative Studio",
    content:
      "Perfect blend of technical skills and design sensibility. The user experience is intuitive and the code quality is exceptional.",
    avatar: "https://placehold.co/100x100/F59E0B/FFFFFF?text=ER",
    rating: 5,
  },
];
