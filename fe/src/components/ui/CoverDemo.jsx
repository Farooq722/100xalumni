import React from "react";
import { Cover } from "@/components/ui/cover";

export function CoverDemo() {
  return (
    (<div>
      <h1
        className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 dark:from-black dark:via-gray-800 dark:to-gray-700">
        <Cover>100xAlumni</Cover>
      </h1>
    </div>)
  );
}
