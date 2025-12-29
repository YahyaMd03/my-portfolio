"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FiCheck, FiCircle } from "react-icons/fi";

interface ChecklistItem {
  text: string;
  completed: boolean;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

export interface TechChecklistData {
  name: string;
  icon: IconType;
  color: string;
  darkColor?: string;
  proficiency: number;
  experience: string;
  categories: ChecklistCategory[];
}

interface TechChecklistProps {
  tech: TechChecklistData;
  index: number;
}

export function TechChecklist({ tech, index }: TechChecklistProps) {
  const Icon = tech.icon;
  const completedCount = tech.categories.reduce(
    (acc, cat) => acc + cat.items.filter((item) => item.completed).length,
    0
  );
  const totalCount = tech.categories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="h-full p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-xl">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`p-3 rounded-xl shrink-0 ${
              tech.darkColor ? "bg-zinc-200 dark:bg-zinc-700" : ""
            }`}
            style={
              !tech.darkColor
                ? { backgroundColor: `${tech.color}20` }
                : undefined
            }
          >
            <Icon
              className={`w-8 h-8 ${
                tech.darkColor ? "text-black dark:text-white" : ""
              }`}
              style={!tech.darkColor ? { color: tech.color } : undefined}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
              {tech.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {tech.experience}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold" style={{ color: tech.color }}>
              {completionPercentage}%
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">mastery</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: tech.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${completionPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {completedCount} of {totalCount} skills
            </span>
            <span>Proficiency: {tech.proficiency}%</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-5">
          {tech.categories.map((category, catIndex) => (
            <div key={catIndex}>
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {category.title}
              </h4>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-sm"
                  >
                    {item.completed ? (
                      <FiCheck
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: tech.color }}
                      />
                    ) : (
                      <FiCircle className="w-4 h-4 mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-600" />
                    )}
                    <span
                      className={
                        item.completed
                          ? "text-zinc-700 dark:text-zinc-300"
                          : "text-zinc-400 dark:text-zinc-500"
                      }
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Category Header Component
export function CategoryHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: IconType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-6 h-6 text-violet-500" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </motion.div>
  );
}



