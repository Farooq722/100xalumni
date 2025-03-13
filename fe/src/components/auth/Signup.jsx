import React, { useState } from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/Input ";
import { Label } from "../ui/Label ";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { WavyBackground } from "../ui/WavyBackground ";
import { toast } from "react-toastify";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import useUserStore from "../zustund/store";

export function Signup() {
  const { login, loader, setLoader } = useUserStore();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await axios.post(
        `${BACKEND_API_END_POINT}/register`,
        { ...input },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        localStorage.setItem("token", data?.accessToken);
        login(data.user);
        toast.success(data.msg);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <WavyBackground>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-300 dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to <span className="italic">100xAlumni</span>
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Register to 100xAlumni if you want to connect with wise minds.
        </p>
        <form className="my-8" onSubmit={submitHandler}>
          <LabelInputContainer>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullName"
              value={input.fullName}
              type="text"
              placeholder="Full Name"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              placeholder="email@gmail.com"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              placeholder="••••••••"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex justify-center gap-10 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alumni" id="role-alumni" />
                <Label htmlFor="role-alumni">100xAlumni</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="role-user" />
                <Label htmlFor="role-user">Normal User</Label>
              </div>
            </RadioGroup>
          </LabelInputContainer>

          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            Sign up &rarr;
            <BottomGradient />
          </button>
          {loader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black/30 flex justify-center items-center">
              <RingLoader color="white" size={50} />
            </div>
          )}

          <div className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Already have an account?{" "}
            <Link to="/login" className="text-neutral-800 italic text-md">
              Login
            </Link>
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

export default Signup;
