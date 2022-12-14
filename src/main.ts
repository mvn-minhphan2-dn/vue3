import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import store from "./store";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App).use(pinia);
app.use(router).use(store).mount("#app");
