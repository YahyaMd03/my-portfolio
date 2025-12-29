"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="text-xl font-bold bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mohammed Yahya
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/universe"
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
              >
                Skill Universe
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-2xl font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: isMobileMenuOpen ? index * 0.1 : 0 }}
            >
              {item.name}
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ delay: isMobileMenuOpen ? 0.7 : 0 }}
          >
            <Link
              href="/universe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 text-lg font-medium text-white bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-lg shadow-violet-500/25"
            >
              Skill Universe
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}



