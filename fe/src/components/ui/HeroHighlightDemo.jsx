import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./HeroHighlight ";

export function HeroHighlightDemo() {
  return (
    (<HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: [25, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        viewport={{ once: false, amount: 0.4 }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-400 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
        Connect with the bright minds of tech community
         <br />{" "}
         <div className="space-y-2">

        <Highlight className="text-black dark:text-white rounded-lg">
        100xAlumni Connect, 
        </Highlight>
        <br />
        <Highlight className="text-black dark:text-white rounded-lg">Inspire, Multiply Success. 🚀</Highlight>
         </div>
      </motion.h1>
    </HeroHighlight>)
  );
}
