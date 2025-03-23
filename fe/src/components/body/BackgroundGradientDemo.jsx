import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link, useNavigate } from "react-router-dom";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";

export function BackgroundGradientDemo({ user }) {
  const navigate = useNavigate();
  const profilePhoto =
    user?.profile?.profilePhoto ||
    user?.profilePhoto ||
    "https://github.com/shadcn.png";

  return (
    <div className="flex justify-center items-center p-4">
      <BackgroundGradient className="rounded-2xl w-64 h-[370px] sm:w-72 sm:h-[430px] overflow-hidden dark:bg-zinc-900 shadow-md">
        <img
          src={profilePhoto}
          alt="Profile Pic"
          className="object-cover w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto border-4 border-gray-200 dark:border-zinc-700 mt-2"
        />

        <p className="text-base sm:text-lg font-semibold text-center text-black mt-4 dark:text-neutral-200">
          {user?.fullName}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-700 dark:text-neutral-400 mt-2 px-2 line-clamp-5">
          {user?.profile?.bio || "No bio available"}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-3">
          <span className="font-medium">Company:</span>{" "}
          {user?.profile?.present_company || "N/A"}
        </p>
        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-1">
          <span className="font-medium">Role:</span> {user?.role || "N/A"}
        </p>

        <div className="flex justify-center items-center gap-3 mt-3">
          <Link
            to={user?.profile?.socialLinks?.twitter || "#"}
            target="_blank"
            className="hover:text-blue-300"
          >
            <IconBrandTwitter />
          </Link>
          <Link
            to={user?.profile?.socialLinks?.github || "#"}
            target="_blank"
            className="hover:text-slate-400"
          >
            <IconBrandGithub />
          </Link>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            className="rounded-lg py-2 px-4 bg-black text-white dark:bg-zinc-800 text-xs sm:text-sm font-semibold transition hover:bg-gray-900"
            onClick={() => {
              navigate("/details");
            }}
          >
            View Details
          </button>
        </div>
      </BackgroundGradient>
    </div>
  );
}
