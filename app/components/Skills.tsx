"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiAmazonwebservices,
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
  SiElixir,
  SiRedis,
  SiGit,
  SiFramer,
  SiClerk,
  SiPrisma,
} from "react-icons/si";
import { IconType } from "react-icons";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 82 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Elixir", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 78 },
      { name: "Prometheus", level: 75 },
      { name: "Grafana", level: 75 },
    ],
  },
];

interface Technology {
  name: string;
  icon: IconType;
  color: string;
  darkColor?: string;
  bgColor: string;
}

const technologies: Technology[] = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    bgColor: "bg-[#61DAFB]/10",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    darkColor: "#ffffff",
    bgColor: "bg-zinc-200 dark:bg-zinc-700",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    bgColor: "bg-[#3178C6]/10",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    bgColor: "bg-[#339933]/10",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    bgColor: "bg-[#3776AB]/10",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    bgColor: "bg-[#4169E1]/10",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    bgColor: "bg-[#47A248]/10",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    bgColor: "bg-[#06B6D4]/10",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    bgColor: "bg-[#2496ED]/10",
  },
  {
    name: "AWS",
    icon: SiAmazonwebservices,
    color: "#FF9900",
    bgColor: "bg-[#FF9900]/10",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    color: "#326CE5",
    bgColor: "bg-[#326CE5]/10",
  },
  {
    name: "Prometheus",
    icon: SiPrometheus,
    color: "#E6522C",
    bgColor: "bg-[#E6522C]/10",
  },
  {
    name: "Grafana",
    icon: SiGrafana,
    color: "#F46800",
    bgColor: "bg-[#F46800]/10",
  },
  {
    name: "Elixir",
    icon: SiElixir,
    color: "#4B275F",
    bgColor: "bg-[#4B275F]/10",
  },
  {
    name: "Redis",
    icon: SiRedis,
    color: "#DC382D",
    bgColor: "bg-[#DC382D]/10",
  },
  { name: "Git", icon: SiGit, color: "#F05032", bgColor: "bg-[#F05032]/10" },
  {
    name: "Framer",
    icon: SiFramer,
    color: "#0055FF",
    bgColor: "bg-[#0055FF]/10",
  },
  {
    name: "Clerk",
    icon: SiClerk,
    color: "#6C47FF",
    bgColor: "bg-[#6C47FF]/10",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "#2D3748",
    darkColor: "#ffffff",
    bgColor: "bg-[#2D3748]/10",
  },
];

function TechCard({ tech }: { tech: Technology }) {
  const Icon = tech.icon;
  const hasDarkColor = !!tech.darkColor;

  return (
    <div
      className="group flex flex-col items-center justify-center gap-3 px-8 py-6 mx-4 rounded-2xl border border-transparent hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] cursor-default"
      style={{
        background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}08 50%, ${tech.color}02 100%)`,
        boxShadow: `0 4px 20px ${tech.color}15`,
      }}
    >
      <div
        className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
          hasDarkColor ? "bg-zinc-200 dark:bg-zinc-700" : ""
        }`}
        style={
          !hasDarkColor ? { backgroundColor: `${tech.color}20` } : undefined
        }
      >
        <Icon
          className={`w-10 h-10 ${
            hasDarkColor ? "text-black dark:text-white" : ""
          }`}
          style={!hasDarkColor ? { color: tech.color } : undefined}
        />
      </div>
      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

function Marquee({
  children,
  direction = "left",
  speed = 30,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="overflow-hidden relative">
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-linear-to-tl from-fuchsia-100/50 dark:from-fuchsia-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header - constrained width */}
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
              Skills & Technologies
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              My{" "}
              <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Technologies I&apos;ve been working with and continuously learning
              to build amazing products.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Tech Marquee - full width */}
      <AnimatedSection delay={0.2} className="mb-16">
        <div className="space-y-6">
          {/* First row - scrolling left */}
          <Marquee direction="left" speed={35}>
            <div className="flex">
              {technologies
                .slice(0, Math.ceil(technologies.length / 2))
                .map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
          </Marquee>

          {/* Second row - scrolling right */}
          <Marquee direction="right" speed={40}>
            <div className="flex">
              {technologies
                .slice(Math.ceil(technologies.length / 2))
                .map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
          </Marquee>
        </div>
      </AnimatedSection>

      {/* Rest of content - constrained width */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Skill Bars */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: skillIndex * 0.1,
                            ease: [0.21, 0.47, 0.32, 0.98],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Learning Section */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="text-center p-8 bg-linear-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-3xl border border-violet-200 dark:border-violet-800/30">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              Always Learning 📚
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Currently exploring:{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">
                Vector Databases, RAG Systems, Serverless Scaling, Database
                Optimizations, RUST, AI Agents
              </span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
