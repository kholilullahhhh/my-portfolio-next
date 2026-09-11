import { Project, Skill, Testimonial } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portofolio",
    description: "A modern, responsive portfolio built with Next.js",
    longDescription:
      "A personal portfolio website developed using Next.js to showcase my projects, skills, and experiences. The site features a responsive design, smooth page transitions, dynamic content rendering, and SEO optimization. Built from scratch, this portfolio serves as a central hub for my professional presence and highlights my frontend development capabilities.",
    image: "/newHome.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn", "Neon"],
    category: "web",
    liveUrl: "https://luluuu.vercel.app/",
    githubUrl: "https://github.com/kholilullahhhh/my-portfolio-next",
    featured: true,
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
    githubUrl: "#",
    featured: false,
  },
  {
    id: "3",
    title: "BBGTK Sulsel",
    description:
      "Official Website of BBGTK Sulsel - South Sulawesi's Regional Center.",
    longDescription:
      "As the lead developer of an internal management information system for the South Sulawesi Education Office, I built an integrated platform to streamline operations, replacing manual processes. The system includes employee management, educator activity tracking, real-time dashboards with Chart.js, automated PDF/Excel reports, and optimized database performance to handle over 300 daily transactions efficiently.",

    image: "/bbgp.png",
    technologies: ["Laravel", "PHP", "MySQL", "Jquery", "Bootstrap"],
    category: "web",
    liveUrl: "https://simbbgtksulsel.com/",
    githubUrl: "https://github.com/ookapratama/Laravel_bbgp",
    featured: true,
  },
  {
    id: "4",
    title: "Otomatisasi Absensi Siswa dengan Pencocokan Wajah",
    description:
      "presensi pintar Memangkas waktu pencatatan manual, meningkatkan akurasi kehadiran, dan secara real-time.",
    longDescription:
      "Sistem absensi siswa berbasis face recognition yang dirancang untuk mengotomatisasi proses pencatatan kehadiran di SMP Aisyiyah Paccinongang. Menggunakan YOLOv8 untuk deteksi wajah dan FaceNet untuk menghasilkan serta mencocokkan embedding wajah siswa. Sistem mendukung proses pengenalan wajah secara real-time dan menyimpan hasil absensi secara aman ke dalam database.",
    image: "/image.png",
    technologies: [
      "Next.js",
      "Laravel",
      "Python",
      "PostgreSQL",
      "FastAPI",
    ],
    category: "web",
    githubUrl:
      "https://github.com/kholilullahhhh/facerecogetion_yoloV8andFaceNet.git",
    liveUrl: "https://facerecogetion-yolo-v8and-face-net-two.vercel.app/",

    featured: true,
  },
  {
    id: "5",
    title: "Bantaeng Office Smart Service",
    description:
      "digital platform for streamlined public administration in Bantaeng, providing citizens with more accessible access to essential government services.",
    longDescription:
      "Bantaeng Office Smart Service is a web-based platform that digitizes public administration tasks. It lets citizens submit service requests, track status updates in real time, and access government services securely — making public services faster, transparent, and more accessible.",
    image: "/boss.png",
    technologies: ["Laravel", "PHP", "MySQL", "Jquery", "Bootstrap"],
    category: "web",
    githubUrl: "https://github.com/kholilullahhhh/rap",
    featured: true,
  },

  {
    id: "6",
    title: "Harmony Home",
    description:
      "Harmony Home is a modern boarding house offering comfortable rooms, complete facilities, and a peaceful living experience.",
    longDescription:
      "Through a simple and user-friendly digital platform, residents can access important information about their room, facilities, house rules, and available services. The platform is designed to make the rental process more practical and transparent, allowing prospective residents to view room information and make inquiries without complicated procedures. Whether you are a student, employee, or anyone looking for a comfortable place to live, Harmony Home offers a reliable and modern boarding house experience with convenient services and a home-like atmosphere.",
    image: "/harmony.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn",
      "Supabase",
    ],
    category: "web",
    liveUrl: "https://harmonyhome-iota.vercel.app/",
    githubUrl: "https://github.com/kholilullahhhh/harmonyHome-next",
    featured: true,
  },
];

export const skills: Skill[] = [
  { name: "React", proficiency: 95, category: "frontend" },
  { name: "Next.js", proficiency: 90, category: "frontend" },
  { name: "Tailwind CSS", proficiency: 90, category: "frontend" },
  { name: "Node.js", proficiency: 80, category: "backend" },
  { name: "Express", proficiency: 75, category: "backend" },
  { name: "PostgreSQL", proficiency: 75, category: "backend" },
  { name: "Laravel", proficiency: 70, category: "backend" },
  { name: "Figma", proficiency: 85, category: "design" },
];
