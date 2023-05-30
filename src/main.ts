import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { parse, stringify } from "zipson";
import axios from "axios";
import VueAxios from "vue-axios";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { PiniaLogger } from "pinia-logger";
import { VueQueryPlugin } from "@tanstack/vue-query";
// import vue3GoogleLogin from "vue3-google-login";
import VueVideoPlayer from "@videojs-player/vue";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
      },
    },
  },
};
const pinia = createPinia()
  .use(
    createPersistedState({
      key: (id) => `__persisted__${id}`,
      storage: sessionStorage,
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    })
  )
  .use(
    PiniaLogger({
      expanded: true,
      disabled: import.meta.env.mode === "production",
    })
  )
  .use(({ store }) => {
    store.router = markRaw(router);
  });
const app = createApp(App).use(pinia).use(VueAxios, axios);
// app.use(vue3GoogleLogin, {
//   clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//   scope: "email profile",
// });
app.use(VueVideoPlayer);
app.use(router).use(VueQueryPlugin, vueQueryPluginOptions).mount("#app");
