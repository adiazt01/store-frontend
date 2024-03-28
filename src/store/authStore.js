import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/libs/api/axios";

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        login: async (data) => {
          try {
            const response = await api.post("/auth/login", data);
            set({ isAuthenticated: true, user: response.data.user });
          } catch (error) {
            set({ isAuthenticated: false, user: null });
          }
        },
        register: async (data) => {
          try {
            const response = await api.post("/auth/register", data);
            set({ isAuthenticated: true, user: response.data.user });
          } catch (error) {
            set({ isAuthenticated: false, user: null });
          }
        },
        logout: () => set({ isAuthenticated: false, user: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
