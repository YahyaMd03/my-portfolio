"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { submitContactForm } from "../actions/submitContact";
import { useToast } from "./Toast";
import { getCalApi } from "@calcom/embed-react";

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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "yahyamd97@gmail.com",
    href: "mailto:yahyamd97@gmail.com",
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/yahyaMd03/",
    label: "GitHub",
    color: "hover:text-zinc-900 dark:hover:text-white",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohammed-yahya-aa9315147/",
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
  {
    icon: XIcon,
    href: "https://x.com/YahyaMohd03",
    label: "X",
    color: "hover:text-zinc-900 dark:hover:text-white",
  },
];

const subjectOptions = [
  "Project Inquiry",
  "Collaboration Opportunity",
  "Job Opportunity",
  "General Question",
  "Speaking Engagement",
  "Other",
];

// Custom Dropdown Component
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
  id,
  name,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  id: string;
  name: string;
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-left flex items-center justify-between ${
          !value ? "text-zinc-400" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={name}
      >
        <span>{value || placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-zinc-400" />
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden"
        >
          <ul
            role="listbox"
            className="max-h-60 overflow-auto"
            aria-label={name}
          >
            {options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={value === option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  value === option
                    ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
                    : "text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        id={`${id}-hidden`}
        name={name}
        value={value}
        required={required}
      />
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  // Initialize Cal.com embed with error handling
  useEffect(() => {
    let isMounted = true;

    (async function () {
      try {
        const cal = await getCalApi({ namespace: "15min" });

        if (isMounted && cal) {
          cal("ui", {
            hideEventTypeDetails: false,
            layout: "month_view",
          });
        }
      } catch (error) {
        // Silently handle embed initialization errors
        // The embed will still work via data attributes even if API initialization fails
        console.warn("Cal.com embed initialization warning:", error);

        // In development, log helpful message about origin configuration
        if (process.env.NODE_ENV === "development") {
          console.info(
            "Note: 'origins don't match' warnings are typically non-blocking. The embed button should still work via data attributes. If you need to configure allowed origins, check Cal.com Dashboard → Settings → Embed (this setting may not be available in all accounts)."
          );
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      showToast("Please enter your name.", "error");
      return;
    }
    if (!formData.email.trim()) {
      showToast("Please enter your email address.", "error");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    if (!formData.subject.trim()) {
      showToast("Please select a subject.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        showToast(
          result.message ||
            "Thank you! Your message has been sent successfully.",
          "success"
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        showToast(
          result.error || "Failed to send message. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-t from-violet-100/50 dark:from-violet-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Let&apos;s Work{" "}
              <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach
              out. I&apos;m always open to discussing new projects, creative
              ideas, or opportunities.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <StaggerContainer className="space-y-4">
              {contactInfo.map((info) => (
                <StaggerItem key={info.label}>
                  <motion.div
                    className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl text-violet-600 dark:text-violet-400">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-zinc-900 dark:text-white font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-zinc-900 dark:text-white font-medium">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Social Links */}
            <AnimatedSection delay={0.3}>
              <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Connect With Me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-zinc-100 dark:bg-zinc-700/50 rounded-xl text-zinc-600 dark:text-zinc-400 ${social.color} transition-colors`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Schedule Call CTA */}
            <AnimatedSection delay={0.4}>
              <motion.button
                data-cal-namespace="15min"
                data-cal-link="mohammed-yahya-5l6gao/15min"
                data-cal-config='{"layout":"month_view"}'
                className="w-full flex items-center gap-4 p-6 bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar size={24} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">15-min Intro Call</p>
                  <p className="text-sm text-white/80">Discuss your project</p>
                </div>
                <motion.span
                  className="ml-auto"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(value) =>
                    setFormData({ ...formData, subject: value })
                  }
                  options={subjectOptions}
                  placeholder="Select a subject"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={5000}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please feel free to be informal when writing your idea..."
                />
              </div>

              {/* Honeypot field - hidden from users but visible to bots */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
