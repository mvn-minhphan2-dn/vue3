import { getToken, saveToken } from "@/helpers/auth.helper";
import router from "@/router";
import AuthService from "@/services/AuthService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: (): any => ({
    user: getToken() || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    getMe: (state) => state.user,
  },
  actions: {
    async login(payload: any) {
      const auth = await AuthService.login(payload);
      if (auth) {
        this.user = auth;
        saveToken(auth?.jwt);
        router.push("/");
      }
      return auth;
    },
    saveTokenStore(payload: any) {
      saveToken(payload);
      router.push("/");
    },
  },
  persist: true,
});
