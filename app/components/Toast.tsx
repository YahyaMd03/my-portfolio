"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md w-full sm:w-auto pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto"
            >
              <div
                className={`
                  flex items-start gap-3 p-4 rounded-xl border shadow-lg
                  ${
                    toast.type === "success"
                      ? "bg-white dark:bg-zinc-800 border-emerald-200 dark:border-emerald-800/50 text-zinc-900 dark:text-white"
                      : "bg-white dark:bg-zinc-800 border-red-200 dark:border-red-800/50 text-zinc-900 dark:text-white"
                  }
                `}
              >
                <div
                  className={`
                    flex-shrink-0 mt-0.5
                    ${
                      toast.type === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  `}
                >
                  {toast.type === "success" ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                </div>
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  aria-label="Close toast"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

