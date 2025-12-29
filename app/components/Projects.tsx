"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "InvestHerd",
    description:
      "I built InvestHerd after watching families struggle to manage investments across multiple accounts. It's a unified dashboard that syncs everything in real-time with AI-powered insights, transforming portfolio chaos into clarity—all delivered at lightning speed.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Next.js", "TypeScript", "Clerk", "Prisma", "PostgreSQL", "Neon", "AWS Lambda", "Docker", "Framer Motion", "ShadCN"],
    github: "https://github.com/YahyaMd03/invest-herd",
    demo: "https://invest-herd.vercel.app/",
    featured: true,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "Spur AI Live Chat",
    description:
      "A production-quality, end-to-end AI live chat support widget with conversation history, rate limiting, and robust error handling. Built with a clean architecture separating chat logic from LLM services for maintainability and scalability.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    tags: ["Next.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Railway", "OpenAI"],
    github: "https://github.com/YahyaMd03/spur-ai-live-chat",
    demo: "https://spur-ai-live-chat-xi.vercel.app/",
    featured: true,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "Data Analytics Dashboard",
    description:
      "Advanced admin dashboard with real-time sales tracking, customer behavior analytics, and operational metrics. Features dynamic metric cards, interactive charts, and exportable reports with 95% Lighthouse performance.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Next.js", "TypeScript", "ShadCN", "Prisma", "PostgreSQL", "Recharts"],
    github: "",
    demo: "",
    featured: false,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "Multi-Tenant HRMS Platform",
    description:
      "Scalable HRMS with subdomain-based multi-tenant architecture, automated payroll workflows, and comprehensive employee management. Features RBAC, automated PDF payslip generation, and end-to-end payroll processing.",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=500&fit=crop",
    tags: ["React", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Express.js"],
    github: "",
    demo: "",
    featured: false,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "Facilities Management System",
    description:
      "Cross-platform facilities management app with real-time notifications, customer and lift management. Transformed web app to mobile using Capacitor.js with AWS S3 integration for scalable storage.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop",
    tags: ["Vue.js", "Vuetify", "Capacitor.js", "Firebase FCM", "AWS S3"],
    github: "",
    demo: "",
    featured: false,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "ORO Jewellery Admin Portal",
    description:
      "Secure admin portal with JWT authentication, real-time notifications via WebSockets, and automated email marketing. Features location-aware authentication, Twilio OTP 2FA, and optimized content delivery.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    tags: ["Vue.js", "Nuxt.js", "Elixir", "Phoenix", "WebSockets", "Twilio", "AWS CloudFront"],
    github: "",
    demo: "",
    featured: false,
    stats: { stars: 0, forks: 0 },
  },
];

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-linear-to-r from-violet-100/30 dark:from-violet-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Featured{" "}
              <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for
              building impactful applications.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.2}>
              <motion.div
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  className={`relative group ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-2xl transform rotate-2 opacity-20 group-hover:rotate-3 transition-transform duration-300" />
                  <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-zinc-900 rounded-lg font-medium text-sm hover:bg-zinc-100 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg font-medium text-sm hover:bg-zinc-800 transition-colors"
                      >
                        <Github size={16} />
                        Source
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Other Projects Grid */}
        <AnimatedSection>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            Other Noteworthy Projects
          </h3>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.div
                className="group h-full p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl text-violet-600 dark:text-violet-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  {(project.github || project.demo) && (
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700/50 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <motion.a
            href="https://github.com/yahyaMd03/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-violet-600 dark:text-violet-400 font-medium hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View More on GitHub
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}




