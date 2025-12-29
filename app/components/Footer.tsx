"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

// Custom X (Twitter) icon component
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: "https://github.com/yahyaMd03/", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohammed-yahya-aa9315147/",
    label: "LinkedIn",
  },
  { icon: XIcon, href: "https://x.com/YahyaMohd03", label: "X" },
  { icon: Mail, href: "mailto:yahyamd97@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-16 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-2xl font-bold bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mohammed Yahya
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            © {new Date().getFullYear()} Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
            </motion.span>{" "}
            by{" "}
            <span className="text-zinc-900 dark:text-white font-medium">
              Mohammed Yahya
            </span>
          </p>

          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}



