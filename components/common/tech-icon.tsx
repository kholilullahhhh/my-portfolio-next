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
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
};

const iconColors: Record<string, string> = {
  "Next.js": "#000000",
  Express: "#000000",
  "React Native": "#61DAFB",
  "Node.js": "#339933",
  Laravel: "#FF2D20",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Git: "#F03C2E",
  GitHub: "#181717",
};

export default function TechIcon({ name, className = "" }: TechIconProps) {
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
