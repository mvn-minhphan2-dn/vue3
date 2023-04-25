import { defineStore } from "pinia";
import todos from "@/data/index.json";
import type { TodoInfo } from "@/types";

export const useTodoStore = defineStore("todo", {
  state: (): TodoInfo => ({
    todos: todos,
    idUpdate: null,
  }),
  getters: {
    getListTodos: (state) => state.todos,
  },
  actions: {
    add(payload: any) {
      const newTodo = {
        id: Date.now(),
        name: payload,
      };
      this.todos.push(newTodo);
    },
    remove(todoId: number) {
      const todoIndex = this.findIndexById(todoId);
      return this.todos.splice(todoIndex, 1);
    },
    update(payload: any) {
      const todoIndex = this.findIndexById(this.idUpdate as number);
      this.$reset();
      return [...this.todos, (this.todos[todoIndex].name = payload)];
    },
    findIndexById(todoId: string | number) {
      return this.todos.findIndex((todo) => todo.id === todoId);
    },
    $reset() {
      this.idUpdate = null;
    },
  },
  persist: true,
});
