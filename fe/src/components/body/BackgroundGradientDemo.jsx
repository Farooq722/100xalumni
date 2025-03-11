import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { useNavigate } from "react-router-dom";

export function BackgroundGradientDemo({ user }) {
  const navigate = useNavigate();
  const profilePhoto =
    user?.profile?.profilePhoto ||
    user?.profilePhoto ||
    "https://github.com/shadcn.png";

  return (
    <div className="flex justify-center items-center p-4">
      <BackgroundGradient className="rounded-2xl max-w-xs sm:max-w-sm w-full p-6 sm:p-10 dark:bg-zinc-900 shadow-md">
        <img
          src={profilePhoto}
          alt="Profile Pic"
          className="object-cover w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto border-4 border-gray-200 dark:border-zinc-700"
        />

        <p className="text-base sm:text-lg font-semibold text-center text-black mt-4 dark:text-neutral-200">
          {user?.fullName}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-700 dark:text-neutral-400 mt-2 px-2">
          {user?.profile?.bio || "No bio available"}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-4">
          <span className="font-medium">Company:</span>{" "}
          {user?.profile?.present_company || "N/A"}
        </p>
        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-1">
          <span className="font-medium">Role:</span> {user?.role || "N/A"}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-1">
          <span className="font-medium">Graduation Year:</span>{" "}
          {user?.graduateYear || "N/A"}
        </p>

        <div className="flex justify-center mt-5">
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
