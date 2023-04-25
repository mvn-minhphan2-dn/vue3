import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/helpers/auth.helper";
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const LoginView = () => import("@/views/features/login/LoginView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
      // beforeEnter: async (to, from, next) => {
      //   const isAuthenticated = await getToken();
      //   if (isAuthenticated) next("/");
      //   else next();
      // },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});
// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = await getToken();
//   if (to.meta.requiresAuth && !isAuthenticated) next({ name: "login" });
//   else next();
// });

export default router;
