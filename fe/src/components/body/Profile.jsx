import React, { useState } from "react";
import useUserStore from "../zustund/store";
import { Button } from "../ui/button";
import {
  Heart,
  Mail,
  Phone,
  MapPinned,
  School,
  Building2,
  Brain,
  Download,
} from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconFileCertificate,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { NavbarDemo } from "../ui/NavbarDemo";
import { WavyBackground } from "../ui/WavyBackground ";

const Profile = () => {
  const { userData } = useUserStore();
  const [count, setCount] = useState(0);

  let finalProfilePhoto =
    userData?.role === "alumni" && userData?.profile?.profilePhoto
      ? userData?.profile?.profilePhoto
      : "https://github.com/shadcn.png";

  const url = userData?.profile?.socialLinks?.github || "";
  const username = url.split("/").pop();

  return (
    <WavyBackground>
      <div className="min-h-screen px-4 sm:px-8">
        <div className="fixed w-full bg-white shadow-md">
          <NavbarDemo />
        </div>

        <div className="flex flex-col md:flex-row min-h-screen pt-16 gap-8 items-center">
          
          <div className="w-full md:w-1/3 flex flex-col items-center text-center md:text-left mt-4">
            <img
              src={finalProfilePhoto}
              alt="Profile Photo"
              className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-[270px] md:h-[270px] object-cover border-4 border-gray-300 dark:border-gray-700"
            />

            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4">
              {userData?.fullName}
            </h1>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2 px-4">
              {userData?.profile?.bio || "No bio available"}
            </p>

            <Button
              className="bg-cyan-200 w-20 mt-4 hover:bg-cyan-300"
              onClick={() => setCount((prev) => prev + 1)}
            >
              <Heart color="red" size={24} />
            </Button>

            <div className="flex flex-col items-center md:items-start mt-4 space-y-2">
              <Link to={userData?.profile?.socialLinks?.twitter || "#"} target="_blank" className="flex items-center gap-2 text-sm sm:text-base">
                <IconBrandTwitter size={20} /> Twitter
              </Link>
              <Link to={userData?.profile?.socialLinks?.linkedIn || "#"} target="_blank" className="flex items-center gap-2 text-sm sm:text-base">
                <IconBrandLinkedin size={20} /> LinkedIn
              </Link>
              <Link to={userData?.profile?.socialLinks?.github || "#"} target="_blank" className="flex items-center gap-2 text-sm sm:text-base">
                <IconBrandInstagram size={20} /> GitHub
              </Link>
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg">
            <div className="text-gray-900 dark:text-white text-sm sm:text-base">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Mail size={20} />
                  <span>{userData?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={20} />
                  <span>{userData?.profile?.phoneNumber || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconFileCertificate size={20} />
                  <span>{userData?.profile?.degree || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} />
                  <span>{userData?.profile?.present_company || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain size={20} />
                  <span>{userData?.profile?.skills || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={20} />
                  <button
                    onClick={() => window.open(userData?.profile?.resume, "_blank")}
                    className="text-blue-500 hover:underline"
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            {username && (
              <div className="mt-6">
                <img src={`https://ghchart.rshah.org/${username}`} alt="GitHub Contribution Chart" className="w-full max-w-sm mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </WavyBackground>
  );
};

export default Profile;
