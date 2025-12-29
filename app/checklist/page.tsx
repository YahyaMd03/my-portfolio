"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { allTechs, TechWithDocs } from "../universe/checklistData";
import { TechChecklist, TechChecklistData, CategoryHeader } from "../components/TechChecklist";
import { FiArrowLeft, FiSearch, FiGrid, FiList } from "react-icons/fi";
import Link from "next/link";

// Transform TechWithDocs to TechChecklistData
function transformToChecklistData(tech: TechWithDocs): TechChecklistData {
  const categories = [];

  // Best Practices category
  if (tech.bestPractices && tech.bestPractices.length > 0) {
    categories.push({
      title: "Best Practices",
      items: tech.bestPractices.map((practice) => ({
        text: practice,
        completed: true, // You can make this dynamic based on user progress
      })),
    });
  }

  // Quick Start / Setup category
  if (tech.initSteps && tech.initSteps.length > 0) {
    categories.push({
      title: "Setup & Initialization",
      items: tech.initSteps.map((step) => ({
        text: step,
        completed: true, // You can make this dynamic based on user progress
      })),
    });
  }

  // Documentation category
  if (tech.documentation && tech.documentation.length > 0) {
    categories.push({
      title: "Documentation & Resources",
      items: tech.documentation.map((doc) => ({
        text: `${doc.title}: ${doc.description}`,
        completed: false, // Typically documentation is not "completed"
      })),
    });
  }

  // Pro Tips category
  if (tech.proTips && tech.proTips.length > 0) {
    categories.push({
      title: "Pro Tips",
      items: tech.proTips.map((tip) => ({
        text: tip,
        completed: true, // You can make this dynamic based on user progress
      })),
    });
  }

  return {
    name: tech.name,
    icon: tech.icon,
    color: tech.color,
    darkColor: tech.darkColor,
    proficiency: tech.proficiency,
    experience: tech.experience,
    categories,
  };
}

export default function ChecklistPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Please sign in to view your skill checklists.
          </p>
          <Link
            href="/sign-in?redirect_url=/checklist"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Transform all techs to checklist data
  const checklistData = allTechs.map(transformToChecklistData);

  // Filter based on search
  const filteredData = searchQuery
    ? checklistData.filter((tech) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : checklistData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                aria-label="List view"
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Skill Checklists
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Track your progress across {allTechs.length} technologies and frameworks
          </p>
        </motion.div>

        {/* Results count */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-zinc-600 dark:text-zinc-400"
          >
            Found {filteredData.length} {filteredData.length === 1 ? "technology" : "technologies"}
          </motion.div>
        )}

        {/* Checklist Grid/List */}
        {filteredData.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {filteredData.map((tech, index) => (
              <TechChecklist key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              No technologies found matching "{searchQuery}"
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
