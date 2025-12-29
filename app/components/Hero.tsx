"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

// Custom X (Twitter) icon component
const XIcon = ({ size = 20 }: { size?: number }) => (
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

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-violet-50 via-white to-fuchsia-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-linear-to-r from-violet-400/30 to-fuchsia-400/30 dark:from-violet-600/20 dark:to-fuchsia-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-linear-to-r from-pink-400/30 to-orange-400/30 dark:from-pink-600/20 dark:to-orange-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-linear-to-r from-cyan-400/20 to-blue-400/20 dark:from-cyan-600/10 dark:to-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Available for opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="overflow-visible"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                <span className="block text-zinc-900 dark:text-white">
                  Turning Ideas Into
                </span>
                <span className="block mt-2 bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent pb-1">
                  Digital Reality
                </span>
              </h1>
            </motion.div>

            {/* Subtitle - 3 lines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-6 space-y-2"
            >
              <p>
                I build scalable web applications that solve real problems and
                drive business growth. From pixel-perfect UIs to robust backend
                systems, I deliver end-to-end solutions that stakeholders love.
              </p>
              {/* <p>
                
              </p> */}
              <p>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Get your{" "}
                  <span className="text-violet-600 dark:text-violet-400">
                    POC within 24 hours
                  </span>
                  . Fast execution. Quality results.
                </span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-20 scale-90" />
              <div className="absolute inset-0 bg-linear-to-tr from-violet-500 to-pink-500 rounded-full transform rotate-6 opacity-10" />

              {/* Image container */}
              <motion.div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-visible border-4 border-white dark:border-zinc-800 shadow-2xl shadow-violet-500/20 bg-linear-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/hero-bg.png"
                  alt="Mohammed Yahya"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-auto max-w-none object-contain"
                />
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-2xl opacity-80"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-16 h-16 bg-linear-to-br from-pink-500 to-orange-500 rounded-full opacity-80"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => {
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="p-2 text-zinc-400 hover:text-violet-500 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to about section"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
