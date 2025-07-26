import { Project, Skill, Testimonial } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portofolio",
    description: "A modern, responsive portfolio built with Next.js",
    longDescription:
      "A personal portfolio website developed using Next.js to showcase my projects, skills, and experiences. The site features a responsive design, smooth page transitions, dynamic content rendering, and SEO optimization. Built from scratch, this portfolio serves as a central hub for my professional presence and highlights my frontend development capabilities.",
    image: "/portfolio.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn"],
    category: "web",
    liveUrl: "https://luluuu.vercel.app/",
    githubUrl: "https://github.com/kholilullahhhh/my-portfolio-next",
    featured: false,
  },
  {
    id: "2",
    title: "Mobile DCC",
    description: "React Native mobile app for Dipanegara Computer Club.",
    longDescription:
      "Developed the official DCC mobile app using React Native and Go to centralize club resources for 200+ members. Optimized API performance for slow networks and implemented offline video caching, reducing student data usage by 40% compared to web platforms.",
    image: "/mobileDCC.png",
    technologies: ["React Native", "JavaScript", "Go", "Axios", "RESTful API"],
    category: "mobile",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "3",
    title: "Sistem Pembayaran SPP",
    description:
      "A digital SPP payment system integrated with Midtrans gateway",
    longDescription:
      "A web-based SPP payment system designed to streamline tuition fee transactions. Integrated with the Midtrans payment gateway, it supports various payment methods, provides real-time status updates, and ensures secure, seamless transactions for students and administrators.",

    image: "/midtrans.png",
    technologies: ["Laravel", "PHP", "MySQL", "Jquery", "Bootstrap"],
    category: "web",
    githubUrl: "https://github.com/kholilullahhhh/Spp-paymantGateway-midtrans",
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
