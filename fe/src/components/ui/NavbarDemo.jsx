import React from "react";
import { Menu } from "../ui/navbar-menu";
import { Link } from "react-router-dom";
import useUserStore from "../zustund/store";
import { toast } from "react-toastify";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const { userData } = useUserStore();

  return (
    <div
      className={`fixed top-10 inset-x-0 max-w-sm mx-auto z-50 ${className}`}
    >
      <Menu>
        <Link to={"/dashboard"} className="hover:text-slate-300 text-white">
          Dashboard
        </Link>
        {userData.role === "alumni" ? (
          <Link to={"/alumni"} className="hover:text-slate-300 text-white">
            100xForm
          </Link>
        ) : (
          <Link
            to={"#"}
            className="hover:text-slate-300 text-white"
            onClick={() => {
              toast.success("User don't have access");
            }}
          >
            100xAlumni
          </Link>
        )}
        <Link
          to={"https://harkirat.classx.co.in"}
          target="_blank"
          className="hover:text-slate-300 text-white"
        >
          100xDevs
        </Link>
      </Menu>
    </div>
  );
}
