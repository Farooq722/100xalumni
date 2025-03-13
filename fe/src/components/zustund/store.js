import { create } from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  alumniDetails: [null],
  allUsersData: [],
  loader: false,

  setAllUsersData: (data) => {
    set((state) => ({
      allUsersData: data.length ? data : state.allUsersData,
    }));
  },

  updateUserData: (updatedUser) => {
    set((state) => {
      const isCurrentUser = state.userData?._id === updatedUser._id;

      if (isCurrentUser) {
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      }

      return {
        allUsersData: state.allUsersData.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        ),
        userData: isCurrentUser ? updatedUser : state.userData,
      };
    });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  setUserData: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ userData });
  },

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(true));
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ user: true, userData });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    set({ user: null, userData: {} });
  },

  setLoader: (status) => set({ loader: status }),
}));

export default useUserStore;
