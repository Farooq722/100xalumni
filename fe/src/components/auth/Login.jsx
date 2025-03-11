import React, { useState } from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/Input ";
import { Label } from "../ui/Label ";
import { Link, useNavigate } from "react-router-dom";
import { WavyBackground } from "../ui/WavyBackground ";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import { RingLoader } from "react-spinners";
import useUserStore from "../zustund/store";

export function Login() {
  const { login, loader, setLoader } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true)
      const { data } = await axios.post(
        `${BACKEND_API_END_POINT}/login`, 
        {email, password }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      // console.log(data);
      if(data.success) {
        localStorage.setItem("token", data?.accessToken)
        login(data.user);
        toast.success(data.msg);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");    
    }
    finally {
      setLoader(false)
    }
  }

  return (
    <WavyBackground>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-300 dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to 100xAlumni
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to 100xAlumni if you want to connect with 100xdevs
        </p>
        <form className="my-8" onSubmit={submitHandler}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input 
            id="email"
            value={email}
            placeholder="email@gmail.com" 
            type="email" 
            onChange={(e) => {setEmail(e.target.value)}}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input 
            id="password" 
            value={password}
            placeholder="••••••••" 
            type="password" 
            onChange={(e) => {setPassword(e.target.value)}}
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          { loader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black/30 flex justify-center items-center">
              <RingLoader color="white" size={50} />
            </div>
          )}

          <div className="flex justify-between items-center space-y-4">
            <div className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 items-center">
              Don't have an account:{" "}
              <Link to="/signup" className="text-neutral-800 italic text-md">
                Signup
              </Link>
            </div>
            <div className="items-center">
              <Link
                to="#"
                className="text-neutral-800 italic text-sm max-w-sm mt-2"
              >
                Forgot Password ?
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <SocialButton icon={<IconBrandGithub />} label="GitHub" />
            <SocialButton icon={<IconBrandGoogle />} label="Google" />
          </div>
        </form>
      </div>
    </WavyBackground>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button
    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    type="button"
  >
    {React.cloneElement(icon, {
      className: "h-4 w-4 text-neutral-800 dark:text-neutral-300",
    })}
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      {label}
    </span>
    <BottomGradient />
  </button>
);

export default Login;
