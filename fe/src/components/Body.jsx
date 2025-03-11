import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { BackgroundGradientDemo } from "./body/BackgroundGradientDemo";
import { useNavigate } from "react-router-dom";
import useUserStore from "./zustund/store";
import axios from "axios";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";

const Body = () => {
  const { user, allUsersData, setAllUsersData, userData } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/all-user`, {
          withCredentials: true,
        });

        if (response.data.success && response.data.users) {
          setAllUsersData(response.data.users);
        } else {
          setAllUsersData([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Error fetching users");
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (user === null) return;
    if (!user) navigate("/");
  }, [user]);

  const sortedUsers = [...allUsersData].sort((a, b) => {
    return a._id === userData?._id ? -1 : b._id === user?._id ? 1 : 0;
  });

  return (
    <div className="bg-slate-100 min-h-screen">
      {user && (
        <>
          <Navbar />
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedUsers.map((item) => (
                <BackgroundGradientDemo key={item._id} user={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
