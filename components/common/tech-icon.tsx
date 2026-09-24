"use client";

import {
  SiNextdotjs,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiGo,
  SiAxios,
  SiPhp,
  SiJquery,
  SiBootstrap,
  SiSupabase,
  SiShadcnui,
  SiNeon,
  SiVercel,
  SiPython,
  SiHtml5,
  SiCss,
  SiGnubash,
  SiSharp,
  SiOpenjdk,
  SiKotlin,
  SiDart,
  SiSwift,
  SiC,
  SiCplusplus,
  SiRuby,
  SiScala,
  SiRust,
  SiElixir,
  SiPerl,
  SiLua,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface TechIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  Express: SiExpress,
  "React Native": SiReact,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  Go: SiGo,
  Axios: SiAxios,
  PHP: SiPhp,
  Jquery: SiJquery,
  Bootstrap: SiBootstrap,
  Supabase: SiSupabase,
  Shadcn: SiShadcnui,
  Neon: SiNeon,
  Vercel: SiVercel,
  HTML: SiHtml5,
  CSS: SiCss,
  Blade: SiLaravel,
  Shell: SiGnubash,
  "C#": SiSharp,
  Java: SiOpenjdk,
  Kotlin: SiKotlin,
  Dart: SiDart,
  Swift: SiSwift,
  C: SiC,
  "C++": SiCplusplus,
  Ruby: SiRuby,
  Scala: SiScala,
  Rust: SiRust,
  Elixir: SiElixir,
  Perl: SiPerl,
  Lua: SiLua,
  Docker: SiDocker,
  Figma: SiFigma,
};

const iconColors: Record<string, string> = {
  "Next.js": "#000000",
  Express: "#000000",
  "React Native": "#61DAFB",
  React: "#61DAFB",
  "Node.js": "#339933",
  Laravel: "#FF2D20",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Git: "#F03C2E",
  GitHub: "#181717",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  JavaScript: "#F7DF1E",
  Go: "#00ADD8",
  Axios: "#5A29E4",
  PHP: "#777BB4",
  Jquery: "#0769AD",
  Bootstrap: "#7952B3",
  Supabase: "#3FCF8E",
  Shadcn: "#000000",
  Neon: "#00E599",
  Vercel: "#000000",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Blade: "#FF2D20",
  Shell: "#4EAA25",
  "C#": "#239120",
  Java: "#ED8B00",
  Kotlin: "#7F52FF",
  Dart: "#0175C2",
  Swift: "#F05138",
  C: "#A8B9CC",
  "C++": "#00599C",
  Ruby: "#CC342D",
  Scala: "#DC322F",
  Rust: "#000000",
  Elixir: "#4B275F",
  Perl: "#0298C3",
  Lua: "#000080",
  Docker: "#2496ED",
  Figma: "#F24E1E",
};

const gradientIcons: Record<string, string> = {
  Python: "/python.svg",
};

export default function TechIcon({ name, className = "" }: TechIconProps) {
  const gradientSrc = gradientIcons[name];

  if (gradientSrc) {
    return (
      <img
        src={gradientSrc}
        alt={name}
        className={className}
      />
    );
  }

  const Icon = iconMap[name];
  const color = iconColors[name];

  if (!Icon) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-full bg-current/10 text-[10px] font-bold`}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return <Icon className={className} color={color} />;
}
