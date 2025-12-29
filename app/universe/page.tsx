"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { allTechs, TechWithDocs } from "./checklistData";
import {
  FiArrowLeft,
  FiX,
  FiExternalLink,
  FiBook,
  FiCode,
  FiZap,
  FiTerminal,
  FiSearch,
} from "react-icons/fi";
import Link from "next/link";

interface BubblePosition {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

interface StarPosition {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

export default function UniversePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [selectedTech, setSelectedTech] = useState<TechWithDocs | null>(null);
  const [bubblePositions, setBubblePositions] = useState<BubblePosition[]>([]);
  const [stars, setStars] = useState<StarPosition[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Generate positions spread across full viewport with collision detection
  const generatePositions = useCallback(() => {
    if (!allTechs || allTechs.length === 0) {
      return [];
    }
    
    const positions: BubblePosition[] = [];
    const minDistance = 13; // Minimum distance between planet centers (%)
    const maxAttempts = 150;
    
    // Account for padding: top 70px, bottom 20px in a 100vh screen
    // So usable space is roughly 5% to 95% vertically, but we'll use 8% to 92%
    const minY = 8;
    const maxY = 92;
    const minX = 8;
    const maxX = 92;

    // Calculate optimal grid for better distribution
    const aspectRatio = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16/9;
    const gridCols = Math.ceil(Math.sqrt(allTechs.length * aspectRatio));
    const gridRows = Math.ceil(allTechs.length / gridCols);
    
    for (let i = 0; i < allTechs.length; i++) {
      let x: number = 50;
      let y: number = 50;
      let attempts = 0;
      let validPosition = false;

      while (!validPosition && attempts < maxAttempts) {
        // Use grid-based distribution with randomness
        const gridCol = i % gridCols;
        const gridRow = Math.floor(i / gridCols);
        
        // Base position in grid cell
        const cellWidth = (maxX - minX) / gridCols;
        const cellHeight = (maxY - minY) / gridRows;
        
        const baseX = minX + (gridCol + 0.5) * cellWidth;
        const baseY = minY + (gridRow + 0.5) * cellHeight;
        
        // Add randomness within cell (60% of cell size)
        const randomOffsetX = (Math.random() - 0.5) * cellWidth * 0.6;
        const randomOffsetY = (Math.random() - 0.5) * cellHeight * 0.6;
        
        x = Math.max(minX, Math.min(maxX, baseX + randomOffsetX));
        y = Math.max(minY, Math.min(maxY, baseY + randomOffsetY));

        // Check collision with existing positions
        validPosition = positions.every((pos) => {
          const dx = pos.x - x;
          const dy = pos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance >= minDistance;
        });

        attempts++;
      }

      // If still no valid position, use spiral fallback
      if (!validPosition) {
        const angle = (i / allTechs.length) * Math.PI * 2;
        const spiralFactor = i / allTechs.length;
        const radius = 15 + spiralFactor * 25;
        x = 50 + Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
        y = minY + (maxY - minY) * (0.3 + Math.random() * 0.4) + Math.sin(angle) * radius * 0.3;
        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));
      }

      positions.push({
        x,
        y,
        scale: 0.7 + Math.random() * 0.3, // Smaller planets (0.7-1.0x)
        delay: i * 0.02,
      });
    }

    return positions;
  }, []);

  // Generate stars
  const generateStars = useCallback(() => {
    const starCount = 150;
    const starPositions: StarPosition[] = [];
    
    for (let i = 0; i < starCount; i++) {
      starPositions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2, // 1-3px stars
        opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0 opacity
        twinkleDelay: Math.random() * 5, // Random twinkle delay
      });
    }
    
    return starPositions;
  }, []);

  useEffect(() => {
    setIsClient(true);
    // Only generate positions if we have techs and window is available
    if (typeof window !== 'undefined' && allTechs && allTechs.length > 0) {
      setBubblePositions(generatePositions());
      setStars(generateStars());
    }
  }, []); // Run once on mount

  // Filter techs based on search query
  const filteredTechs = searchQuery
    ? allTechs.filter((tech) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle clicking on search result
  const handleSearchSelect = (tech: TechWithDocs) => {
    setSelectedTech(tech);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // Handle click outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBubbleClick = (tech: TechWithDocs) => {
    setSelectedTech(tech);
  };

  const handleClose = () => {
    setSelectedTech(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedTech) {
          setSelectedTech(null);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedTech, isSearchOpen]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="h-screen bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not signed in (should be handled by middleware, but adding as fallback)
  if (!isSignedIn) {
    return (
      <div className="h-screen bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-zinc-400 mb-6">
            Please sign in to explore the skill universe.
          </p>
          <Link
            href="/sign-in?redirect_url=/universe"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-violet-900/20 via-[#0a0a0f] to-[#0a0a0f]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Stars */}
        {stars.map((star, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
            animate={{
              opacity: [
                star.opacity * 0.5,
                star.opacity,
                star.opacity * 0.5,
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <div className="text-sm text-zinc-500">
            <span className="text-violet-400 font-semibold">
              {allTechs.length}
            </span>{" "}
            Technologies
          </div>
        </div>
      </nav>

      {/* Search and instruction at 2/3 center */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-20"
        style={{ top: "66.67%" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Instruction text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-400 text-sm sm:text-base text-center px-4"
          >
            <span className="text-violet-400">Click</span> any bubble to explore
          </motion.p>

          {/* Search input with dropdown */}
          <div ref={searchContainerRef} className="relative w-64 sm:w-80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search technologies..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 backdrop-blur-sm transition-all"
                />
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchQuery && filteredTechs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f15] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 max-h-80 overflow-y-auto"
                  >
                    {filteredTechs.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => handleSearchSelect(tech)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${tech.color}20` }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{
                                color: tech.darkColor || tech.color,
                              }}
                            />
                          </div>
                          <span className="text-white font-medium">
                            {tech.name}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Planets Container - Full viewport height */}
      <div className="absolute inset-0 w-full h-full" style={{ paddingTop: "70px", paddingBottom: "20px" }}>
        {allTechs && allTechs.length > 0 && bubblePositions.length > 0 ? (
          allTechs.map((tech, index) => {
            const position = bubblePositions[index];
            if (!position) return null;

            const Icon = tech.icon;
            const isSelected = selectedTech?.name === tech.name;

            return (
            <motion.button
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isSelected ? 0.3 : 1,
                scale: position.scale,
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.5, delay: position.delay },
                x: {
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: position.scale * 1.2, zIndex: 50 }}
              whileTap={{ scale: position.scale * 0.9 }}
              onClick={() => handleBubbleClick(tech)}
              className="absolute group cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Outer glow/atmosphere - subtle */}
              <div
                className="absolute inset-0 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  backgroundColor: tech.color,
                  transform: "scale(1.3)",
                }}
              />

              {/* Planet body - sharp and bright */}
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:border-opacity-100"
                style={{
                  backgroundColor: `${tech.color}20`,
                  borderColor: `${tech.color}50`,
                  boxShadow: `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}20`,
                }}
              >
                
                {/* Icon */}
                <Icon
                  className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.darkColor || tech.color }}
                />
              </div>

              {/* Tech name tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                <span className="text-xs font-medium text-white bg-zinc-800/90 px-3 py-1.5 rounded-full border border-white/10">
                  {tech.name}
                </span>
              </div>
            </motion.button>
          );
        })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Tech Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] cursor-pointer"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-[70] overflow-hidden pointer-events-none"
            >
              <div
                className="h-full w-full rounded-3xl border overflow-hidden pointer-events-auto"
                style={{
                  backgroundColor: "#0f0f15",
                  borderColor: `${selectedTech.color}30`,
                }}
              >
                {/* Modal Header */}
                <div
                  className="relative px-6 sm:px-8 py-6 border-b"
                  style={{
                    background: `linear-gradient(135deg, ${selectedTech.color}15, transparent)`,
                    borderColor: `${selectedTech.color}20`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedTech(null)}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
                  >
                    <FiX className="w-6 h-6 text-white" />
                  </button>

                  <div className="flex items-center gap-4">
                    <div
                      className="p-4 rounded-2xl"
                      style={{ backgroundColor: `${selectedTech.color}20` }}
                    >
                      <selectedTech.icon
                        className="w-10 h-10 sm:w-12 sm:h-12"
                        style={{
                          color:
                            selectedTech.darkColor || selectedTech.color,
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {selectedTech.name}
                      </h2>
                      <p className="text-zinc-400 text-sm sm:text-base">
                        {selectedTech.experience}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto h-[calc(100%-100px)] p-6 sm:p-8 space-y-8">
                  {/* Best Practices */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <FiZap className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Senior Engineer Best Practices
                      </h3>
                    </div>
                    <div className="grid gap-3">
                      {selectedTech.bestPractices.map((practice, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/2 border border-white/5 hover:border-emerald-500/30 transition-colors"
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                            style={{
                              backgroundColor: `${selectedTech.color}20`,
                              color: selectedTech.color,
                            }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                            {practice}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Documentation & Resources */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-violet-500/10">
                        <FiBook className="w-5 h-5 text-violet-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Documentation & Resources
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedTech.documentation.map((doc, idx) => (
                        <motion.a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group flex items-center gap-3 p-4 rounded-xl bg-white/2 border border-white/5 hover:border-violet-500/30 transition-all hover:bg-white/4"
                        >
                          <FiExternalLink className="w-4 h-4 text-violet-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate group-hover:text-violet-300 transition-colors">
                              {doc.title}
                            </p>
                            <p className="text-zinc-500 text-xs truncate">
                              {doc.description}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </section>

                  {/* Quick Start / Initialization */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-cyan-500/10">
                        <FiTerminal className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Quick Start
                      </h3>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0d1117] border border-white/5 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-emerald-400 font-mono">
                          {selectedTech.quickStart}
                        </code>
                      </pre>
                    </div>
                    {selectedTech.initSteps && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-zinc-400 font-medium">
                          Setup Steps:
                        </p>
                        <ol className="space-y-2">
                          {selectedTech.initSteps.map((step, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 text-sm text-zinc-400"
                            >
                              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                                {idx + 1}
                              </span>
                              {step}
                            </motion.li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </section>

                  {/* Pro Tips */}
                  {selectedTech.proTips && (
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <FiCode className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          Pro Tips
                        </h3>
                      </div>
                      <div className="grid gap-3">
                        {selectedTech.proTips.map((tip, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-xl bg-linear-to-r from-amber-500/5 to-transparent border border-amber-500/10"
                          >
                            <p className="text-zinc-300 text-sm sm:text-base">
                              💡 {tip}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

