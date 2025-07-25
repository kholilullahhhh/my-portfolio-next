"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1">
              © {currentYear} Luluuu. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/kholilullahhhh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-9 h-9 p-0"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-kholilullah-8b7832276/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-9 h-9 p-0"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full w-9 h-9 p-0"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
