import { Link } from "react-router-dom";
import { TypewriterEffect } from "./TypewriterEffect";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Learn ",
    },
    {
      text: "Build ",
    },
    {
      text: "Earn ",
    },
    {
      text: "Become ",
    },
    {
      text: "100xDev.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    (<div className="flex flex-col items-center justify-center h-[37rem] bg-black">
      <p className="text-neutral-100 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} className={"text-slate-200"}/>
      <div
        className="flex flex-col md:flex-row space-y-6 mt-6 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-slate-400 hover:bg-slate-500 border dark:border-white border-transparent text-white text-sm">
          <Link to={"https://harkirat.classx.co.in"} target="_blank">100xdevs</Link>
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm hover:bg-slate-200">
          <Link to={"/signup"}>Signup</Link>
        </button>
      </div>
    </div>)
  );
}
