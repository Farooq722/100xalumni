import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "../ui/HoverBorderGradient";
import { NavbarDemo } from "../ui/NavbarDemo";
import { ColourfulText } from "../ui/ColourfulText";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import useUserStore from "../zustund/store";
import { Menu, X } from "lucide-react";

const defaultPhoto = "https://github.com/shadcn.png";

const Navbar = () => {
  const { user, userData, logout } = useUserStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let finalProfilePhoto =
    userData?.role === "alumni" && userData?.profile.profilePhoto
      ? userData?.profile?.profilePhoto
      : defaultPhoto;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        logout();
        navigate("/");
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-black text-white px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="m-2">
          <Link to={"/"}>
            <h1 className="text-2xl sm:text-3xl italic">
              <ColourfulText text={"100xAlumni"} />
            </h1>
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        <div className="hidden md:flex items-center space-x-6">
          {!user ? (
            <div className="flex gap-4 italic">
              <Link to={"/login"}>
                <HoverBorderGradient className="hover:bg-slate-600">
                  Login
                </HoverBorderGradient>
              </Link>
              <Link to={"/signup"}>
                <HoverBorderGradient className="hover:bg-slate-600">
                  Signup
                </HoverBorderGradient>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <NavbarDemo />
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-4 cursor-pointer">
                    <h1 className="text-lg sm:text-xl font-serif italic">
                      Hi {userData?.fullName}
                    </h1>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={finalProfilePhoto} />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-black text-white">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={finalProfilePhoto} />
                    </Avatar>
                    <div className="flex flex-col gap-2 italic">
                      <h3 className="text-lg">{userData?.fullName}</h3>
                      <p className="text-sm text-slate-300">
                        {userData?.email}
                      </p>
                      <p className="text-sm uppercase text-slate-300">
                        {userData?.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-evenly mt-4">
                    <Button
                      className={`hover:bg-slate-600 bg-slate-500 ${
                        userData?.role !== "alumni"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        userData?.role === "alumni" && navigate("/profile")
                      }
                      disabled={userData?.role !== "alumni"}
                    >
                      Visit Profile
                    </Button>
                    <Button
                      className="hover:bg-red-800 bg-red-400"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-3">
          {!user ? (
            <>
              <Link
                to={"/login"}
                className="block text-lg italic"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="block text-lg italic"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <NavbarDemo />
              <Link
                to={"/profile"}
                className="block text-lg italic"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="text-lg text-red-400 italic"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
