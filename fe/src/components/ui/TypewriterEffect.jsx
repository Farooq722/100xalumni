import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate("span", { opacity: 1 }, { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" });
    }
  }, [isInView]);

  return (
    <div className={cn("text-xl md:text-3xl lg:text-5xl font-bold text-center text-slate-50", className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span key={`char-${index}`} className={cn("opacity-0 mx-2", word.className)}>
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block w-[4px] h-6 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div className="text-xl md:text-3xl font-bold whitespace-nowrap"> 
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(word.className)}>
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block w-[4px] h-6 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  );
};
