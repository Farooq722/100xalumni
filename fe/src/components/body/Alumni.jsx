import React, { useState } from "react";
import useUserStore from "../zustund/store";
import { Label } from "../ui/Label ";
import { Input } from "../ui/Input ";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { NavbarDemo } from "../ui/NavbarDemo";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Alumni = () => {
  const { loader, setLoader } = useUserStore();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    bio: "",
    skills: "",
    present_company: "",
    current_role: "",
    graduation_year: "",
    degree: "",
    twitter: "",
    linkedin: "",
    github: "",
    experience: "",
    personalblog: "",
    portfoliowebsite: "",
    country: "",
    state: "",
    profilePhoto: null,
    resume: null,
  });

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileHandler = (e) => {
    const { name, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    try {
      setLoader(true);
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <NavbarDemo />
      <form
        onSubmit={submitHandler}
        className="max-w-4xl mx-auto mt-16 p-5 bg-slate-400 shadow-md rounded-lg"
      >
        <h1 className="text-center text-4xl italic font-mono underline">
          Alumni Details
        </h1>
        {/* <div className="grid gap-2 py-4">
          <Label className="uppercase">Bio</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
            <textarea
              id="bio"
              name="bio"
              rows="3"
              value={input.bio}
              onChange={eventHandler}
              className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
            />
          </div>
        </div> */}

        <LabelInputContainer>
          <Label htmlFor="fullname" className="mt-2">
            Bio
          </Label>
          <Input
            id="bio"
            name="bio"
            value={input.bio}
            type="text"
            placeholder="Bio"
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        {/* <div className="grid gap-4 py-4"> 
          <Label className="uppercase">Skills</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
            <textarea
              id="skills"
              name="skills"
              rows="1"
              value={input.skills}
              onChange={eventHandler}
              className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
            />
          </div>
        </div> */}

        <LabelInputContainer>
          <Label htmlFor="skills" className="mt-2">
            Skills
          </Label>
          <Input
            id="skills"
            name="skills"
            type="text"
            value={input.skills}
            placeholder="skills"
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="present_company" className="mt-2">
            Present Company
          </Label>
          <Input
            id="present_company"
            name="present_company"
            type="text"
            value={input.present_company}
            placeholder="present_company"
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="current_role" className="mt-2">
            Current Role
          </Label>
          <Input
            id="current_role"
            name="current_role"
            type="text"
            value={input.current_role}
            placeholder="current_role"
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="graduation_year" className="mt-2">
            Graduate Year
          </Label>
          <Input
            id="graduation_year"
            name="graduation_year"
            type="text"
            value={input.graduation_year}
            placeholder="graduation_year"
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="degree" className="mt-2">
            Degree
          </Label>
          <Input
            id="degree"
            name="degree"
            value={input.degree}
            placeholder="degree: B Tech / M Tech ..."
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="experience" className="mt-2">
            Experience
          </Label>
          <Input
            id="experience"
            name="experience"
            value={input.experience}
            placeholder="experience..."
            className="mt-2"
            onChange={eventHandler}
          />
        </LabelInputContainer>

        {["Twitter", "Linkedin", "Github", "PersonalbBlog", "Portfolio"].map(
          (platform) => (
            // <div className="grid gap-4 py-4" key={platform}>
            //   <Label className="uppercase">{platform}</Label>
            //   <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
            //     <Input
            //       id={platform}
            //       name={platform}
            //       type="url"
            //       value={input[platform]}
            //       onChange={eventHandler}
            //       className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
            //     />
            //   </div>
            // </div>
            <LabelInputContainer>
              <Label htmlFor={platform.toLowerCase()} className="mt-2">
                {platform}
              </Label>
              <Input
                id={platform.toLowerCase()}
                name={platform.toLowerCase()}
                value={input[platform.toLowerCase()]}
                placeholder={platform}
                className="mt-2"
                onChange={eventHandler}
              />
            </LabelInputContainer>
          )
        )}

        {["Country", "State"].map((item, index) => (
          <LabelInputContainer key={index}>
            <Label htmlFor={item.toLowerCase()} className="mt-2">
              {item}
            </Label>
            <Input
              id={item.toLowerCase()}
              name={item.toLowerCase()}
              value={input[item.toLowerCase()] || ""}
              placeholder={item}
              className="mt-2"
              onChange={eventHandler}
            />
          </LabelInputContainer>
        ))}

        {/* <div className="grid gap-4 py-4">
          <Label className=" uppercase">Profile</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
              onChange={fileHandler}
            />
          </div>
        </div> */}

        <LabelInputContainer>
          <Label htmlFor="profilePhoto" className="mt-2">
            Profile
          </Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={fileHandler}
          />
        </LabelInputContainer>

        {/* <div className="grid gap-4 py-4">
          <Label className=" uppercase">Resume</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
            <Input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              className="col-span-3 bg-gray-200 w-full"
              onChange={fileHandler}
            />
          </div>
        </div> */}

        <LabelInputContainer>
          <Label htmlFor="resume" className="mt-2">
            Resume
          </Label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept="application/pdf"
            className="mt-2"
            onChange={fileHandler}
          />
        </LabelInputContainer>

        <div className="flex justify-center mt-6">
          {loader ? (
            <Button className="w-full md:w-auto">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button className="w-full md:w-auto text-md text-white hover:bg-gray-700 hover:text-white">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

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

export default Alumni;
