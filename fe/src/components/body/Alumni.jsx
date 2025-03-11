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
    personalblog: "",
    portfoliowebsite: "",
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
      const res = await axios.post(`${BACKEND_API_END_POINT}/update`, formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
      });

      console.log(res);
      if(res.data.success) {
        toast.success(res.data.msg);
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
    finally {
      setLoader(false);
    }
  }

return (
  <div className="container mx-auto px-4">
  <NavbarDemo />
  <form onSubmit={submitHandler} className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
    <div className="grid gap-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="text-right uppercase">Bio</Label>
        <textarea
          id="bio"
          name="bio"
          rows="3"
          value={input.bio}
          onChange={eventHandler}
          className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
        />
      </div>
    </div>

    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="text-right uppercase">Skills</Label>
        <textarea
          id="skills"
          name="skills"
          rows="1"
          value={input.skills}
          onChange={eventHandler}
          className="col-span-3 bg-gray-200 p-2 rounded-md border border-gray-900 w-full"
        />
      </div>
    </div>

    {["twitter", "linkedin", "github", "personalblog", "portfoliowebsite"].map((platform) => (
      <div className="grid gap-4 py-4" key={platform}>
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          <Label className="text-right uppercase">{platform}</Label>
          <Input
            id={platform}
            name={platform}
            type="url"
            value={input[platform]}
            onChange={eventHandler}
            className="col-span-3 bg-gray-200 w-full"
          />
        </div>
      </div>
    ))}

    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="text-right uppercase">Profile</Label>
        <Input
          id="profilePhoto"
          name="profilePhoto"
          type="file"
          accept="image/*"
          className="col-span-3 bg-gray-200 w-full"
          onChange={fileHandler}
        />
      </div>
    </div>

    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="text-right uppercase">Resume</Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf"
          className="col-span-3 bg-gray-200 w-full"
          onChange={fileHandler}
        />
      </div>
    </div>

    <div className="flex justify-center mt-6">
      {loader ? (
        <Button className="w-full md:w-auto">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className="w-full md:w-auto text-md text-white hover:bg-gray-700 hover:text-white"
          onClick={() => navigate("/profile")}
        >
          Submit
        </Button>
      )}
    </div>
  </form>
</div>

);
};

export default Alumni;