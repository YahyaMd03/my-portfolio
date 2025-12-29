"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Sophia Fiori",
    location: "California, US (Remote)",
    period: "May 2025 – Present",
    description:
      "Building advanced data analytics and admin dashboards with real-time tracking capabilities. Optimizing data pipelines and implementing secure authentication systems for enterprise applications.",
    achievements: [
      "Built analytics dashboard with dynamic metrics and interactive charts, contributing to revenue growth",
      "Optimized data pipelines reducing load times by 70% and achieving 95% Lighthouse performance",
      "Implemented CI/CD pipelines reducing deployment time by 80% with 99.9% uptime",
      "Integrated OpenAI models for content generation with token usage tracking and monitoring",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN", "Prisma", "PostgreSQL", "JWT", "GitHub Actions", "OpenAI"],
  },
  {
    title: "Independent Developer/Consultant",
    company: "Freelance",
    location: "Remote",
    period: "Apr 2024 – May 2024",
    description:
      "Built comprehensive multi-account portfolio management platform enabling users to manage multiple demat accounts across various brokers under a single unified interface.",
    achievements: [
      "Integrated secure authentication via Clerk with broker-specific OAuth flows",
      "Leveraged Prisma Accelerate caching reducing latency from 2s to 200ms (90% improvement)",
      "Deployed on AWS Lambda with Docker for serverless scalability",
      "Automated deployments via GitHub Actions accelerating release cycles",
    ],
    technologies: ["Next.js", "ShadCN", "Clerk", "Prisma", "PostgreSQL", "Neon", "Docker", "AWS Lambda", "GitHub Actions"],
  },
  {
    title: "Software Developer",
    company: "Align Associate",
    location: "Chennai, TN",
    period: "Nov 2022 – Mar 2024",
    description:
      "Developed scalable multi-tenant systems and cross-platform applications. Led development teams and built comprehensive HRMS, facilities management, and admin portal solutions.",
    achievements: [
      "Developed multi-tenant HRMS with subdomain-based data isolation and RBAC",
      "Led team of 2 junior developers, accelerating development by 30%",
      "Reduced manual payroll processing time by 70% with automated workflows",
      "Engineered real-time notifications reducing service inquiries by 25%",
      "Transformed web app to cross-platform mobile with Capacitor.js",
    ],
    technologies: ["React", "Vue.js", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Firebase", "AWS", "Capacitor.js"],
  },
];

const education = [
  {
    degree: "Bachelor of Engineering in Civil Engineering",
    school: "Saveetha Engineering College",
    period: "2015 - 2019",
    description: "Graduated with First Class distinction.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-linear-to-l from-violet-100/40 dark:from-violet-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
              Career Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Work{" "}
              <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              My professional journey and the companies I&apos;ve had the
              pleasure to work with.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-violet-500 via-fuchsia-500 to-pink-500 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.title} delay={index * 0.1}>
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full transform -translate-x-1/2 border-4 border-white dark:border-zinc-900 z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  } pl-8 md:pl-0`}
                >
                  <motion.div
                    className={`p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    } max-w-xl`}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-3 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 font-medium">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mb-4">
                      <Building2 size={16} />
                      {exp.company}
                    </p>

                    <p
                      className={`text-zinc-600 dark:text-zinc-400 text-sm mb-4 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.description}
                    </p>

                    <ul
                      className={`space-y-2 mb-4 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"
                        >
                          <span className="text-violet-500 mt-1 shrink-0">
                            ✓
                          </span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Education */}
        <AnimatedSection delay={0.3} className="mt-20">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            Education
          </h3>
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {edu.degree}
                </h4>
                <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                  {edu.period}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                {edu.school}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}




