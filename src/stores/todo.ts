import { defineStore } from "pinia";
import todos from "@/data/index.json";

interface State {
  todos: TodoInfo[];
}

export const useTodoStore = defineStore("todo", {
  state: (): State => {
    return {
      todos: todos,
    };
  },
  getters: {
    getListTodos: (state: any) => {
      return state.todos;
    },
  },
  actions: {
    addTodo() {},
    removeTodo() {},
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'user',
  //       storage: localStorage,
  //     },
  //   ],
  // },
});

interface TodoInfo {
  id: number;
  name: string;
  age?: number;
}
