import useUserStore from "@/components/zustund/store";
import React, { createContext } from "react";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  
//   const { setAllUsersData } = useUserStore();

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_API_END_POINT}/all-user`, {
//           withCredentials: true,
//         });

//         if (response.data.success && response.data.users) {
//           setAllUsersData(response.data.users);
//         } else {
//           setAllUsersData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error(error.response?.data?.message || "Error fetching users");
//       }
//     };

//     fetchAllUsers();
//   }, []);

};
