import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({ words, className, filter = true, duration = 0.5 }) => {
  const [scope, animate] = useAnimate(); 
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (scope.current) {
      animate(scope.current.querySelectorAll("span"), 
        { opacity: 1, filter: filter ? "blur(0px)" : "none" }, 
        { duration: duration || 1, delay: stagger(0.2) }
      );
    }
  }, [scope, animate, filter, duration]); // Dependencies updated

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="dark:text-white text-black opacity-0"
                style={{ filter: filter ? "blur(10px)" : "none" }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
