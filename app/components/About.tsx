"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";

// Animated Counter Component
function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);

  // Extract numeric value and suffix (e.g., "4+" -> 4, "+")
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/\d/g, "") || "";

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1
        );

        // Easing function for smooth animation (ease-out quart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * numericValue);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(numericValue);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue, duration]);

  return (
    <div
      ref={ref}
      className="text-3xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
    >
      {count}
      {suffix}
    </div>
  );
}

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code following best practices and design patterns.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description:
      "Approaching complex challenges with creative and efficient solutions.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing applications for speed, accessibility, and user experience.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Implementing security best practices and secure coding patterns to protect applications.",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-violet-100/50 dark:from-violet-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Passionate Developer &{" "}
              <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Creative Mind
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image/Visual */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <motion.div
                className="relative aspect-square max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-3xl transform rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-3xl transform -rotate-3 opacity-10" />

                {/* Main container */}
                <div className="relative bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-2xl shadow-violet-500/10 dark:shadow-black/30 border border-zinc-200 dark:border-zinc-700">
                  {/* Code-like decoration */}
                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <p className="text-zinc-400">
                      <span className="text-fuchsia-500">const</span>{" "}
                      <span className="text-cyan-500">developer</span> ={" "}
                      <span className="text-yellow-500">{"{"}</span>
                    </p>
                    <p className="text-zinc-400 pl-4">
                      <span className="text-violet-500">name</span>:{" "}
                      <span className="text-emerald-500">
                        &quot;Mohammed Yahya&quot;
                      </span>
                      ,
                    </p>
                    <p className="text-zinc-400 pl-4">
                      <span className="text-violet-500">title</span>:{" "}
                      <span className="text-yellow-500">[</span>
                    </p>
                    <p className="text-zinc-400 pl-8">
                      <span className="text-emerald-500">
                        &quot;Full-Stack Developer&quot;
                      </span>
                      ,
                    </p>
                    <p className="text-zinc-400 pl-8">
                      <span className="text-emerald-500">
                        &quot;DevOps&quot;
                      </span>
                      ,
                    </p>
                    <p className="text-zinc-400 pl-8">
                      <span className="text-emerald-500">
                        &quot;Cloud Infrastructure&quot;
                      </span>
                      ,
                    </p>
                    <p className="text-zinc-400 pl-8">
                      <span className="text-emerald-500">
                        &quot;Monitoring Tools&quot;
                      </span>
                    </p>
                    <p className="text-zinc-400 pl-4">
                      <span className="text-yellow-500">]</span>,
                    </p>
                    <p className="text-zinc-400 pl-4">
                      <span className="text-violet-500">experience</span>:{" "}
                      <span className="text-orange-500">4</span>,
                    </p>
                    <p className="text-zinc-400 pl-4">
                      <span className="text-violet-500">passion</span>:{" "}
                      <span className="text-orange-500">Infinity</span>,
                    </p>
                    <p className="text-zinc-400">
                      <span className="text-yellow-500">{"}"}</span>;
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="inline-block w-2 h-5 bg-violet-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right side - Text content */}
          <AnimatedSection delay={0.3}>
            <div className="space-y-6">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I&apos;m a passionate full-stack developer with expertise in
                DevOps, cloud infrastructure, and monitoring tools. With{" "}
                <span className="text-zinc-900 dark:text-white font-semibold">
                  4+ years
                </span>{" "}
                of experience, I specialize in building modern, scalable
                applications and deploying them to production with robust
                infrastructure.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                My journey in tech started with curiosity about how websites
                work, and it has evolved into a fulfilling career where I get to
                turn ideas into reality. I believe in writing{" "}
                <span className="text-zinc-900 dark:text-white font-semibold">
                  clean, maintainable code
                </span>{" "}
                and staying up-to-date with the latest technologies, lately
                building AI agents and workflows.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                {[
                  { value: "4+", label: "Years Experience" },
                  { value: "30+", label: "Projects Completed" },
                  { value: "10+", label: "Happy Clients" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <AnimatedCounter value={stat.value} duration={2} />
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Highlights */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                className="group p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
