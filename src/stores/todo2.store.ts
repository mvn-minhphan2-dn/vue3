import { defineStore } from "pinia";
import { ref, computed } from "vue";
import todos from "@/data/index.json";

export const useTodoStore2 = defineStore(
  "todo2",
  () => {
    // State
    const todoLists = ref<any>(todos || null);

    // Getters
    const getListTodos = computed(() => todoLists.value);

    // Actions
    const add = (payload: any) => {
      todoLists.value.push(payload);
    };

    return {
      todoLists,
      getListTodos,
      add,
    };
  },
  {
    persist: true,
  }
);
