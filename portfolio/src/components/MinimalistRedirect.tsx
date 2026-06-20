import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export default function MinimalistRedirect() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("minimalist-banner-dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("minimalist-banner-dismissed", "true");
  };

  const portfolioUrl =
    import.meta.env.VITE_MINIMALIST_PORTFOLIO_URL || "http://localhost:3000";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-[340px] bg-[#FFECDB] dark:bg-[#18181b] border-3 border-black dark:border-white p-5 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]"
          style={{ borderWidth: "3px" }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#FF9149] fill-[#FF9149]" />
              <h4 className="font-heading text-sm sm:text-base font-bold text-black dark:text-white">
                Terminal View
              </h4>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 border-2 border-black dark:border-white bg-white dark:bg-[#27272a] text-black dark:text-white hover:bg-red-400 dark:hover:bg-red-500 transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X size={14} />
            </button>
          </div>

          <p className="font-body text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Looking for a distraction-free, clean overview of my work? Check out
            my minimalist portfolio.
          </p>

          <div className="flex justify-end">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#60B5FF] text-black font-body font-bold text-xs sm:text-sm border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all duration-200"
            >
              Try Clean View <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
