import { createStore } from "vuex";
import todo from "@/store/modules/todo";
import createPersistedState from "vuex-persistedstate";

export interface TodoState {
  todos: Todo[];
}
export interface Todo {
  id: number;
  name: string;
  age?: number;
}
const store = createStore<TodoState>({
  modules: {
    todo,
  },
  strict: true,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ["todo"],
    }),
  ],
  // strict: process.env.NODE_ENV !== 'production',
});

export default store;
