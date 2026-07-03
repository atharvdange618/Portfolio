import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface RedirectPageProps {
  url: string;
  title: string;
  description?: string;
}

export default function RedirectPage({
  url,
  title,
  description,
}: RedirectPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(url);
    }, 1500);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 relative overflow-hidden bg-white dark:bg-[#09090b]">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#E0FFF1] rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#60B5FF] rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 max-w-md w-full bg-[#FFECDB] dark:bg-[#18181b] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E0FFF1] border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] font-mono text-xs font-medium mb-6">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
          <span className="text-black">REDIRECTING</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3">
          {title}
        </h2>

        <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {description ||
            `You are being redirected to our official page. If you are not redirected in a few seconds, click the link below.`}
        </p>

        <div className="w-full h-3 bg-white dark:bg-[#27272a] border-2 border-black dark:border-white mb-8 overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-[#60B5FF]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#27272a] text-black dark:text-white font-body font-bold text-sm border-2 border-black dark:border-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] dark:hover:shadow-[5px_5px_0px_#fff] transition-all duration-200"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <a
            href={url}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#FF9149] text-black font-body font-bold text-sm border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all duration-200"
          >
            Go Now <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
