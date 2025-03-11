"use client";
import { motion } from "framer-motion";

const ContinuousScroll = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 h-20 flex items-center">
      <motion.div
        className="flex whitespace-nowrap text-white text-2xl font-bold"
        initial={{ x: "100%" }} 
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        🚀Every developer deserves to be a great engineer, a 100xEngineer!
        Give yourself the power you deserve with a 100xdevs today! 🚀
      </motion.div>
    </div>
  );
};

export default ContinuousScroll;
