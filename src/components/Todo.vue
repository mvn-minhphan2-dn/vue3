<template>
  <li class="flex items-center justify-between pb-2 mb-2 border-b-2">
    <router-link
      class="font-semibold text-red-500 hover:bg-transparent"
      :to="{ name: 'about', params: { id: todo.id } }"
    >
      {{ todo.name }}
    </router-link>
    <div>
      <button
        type="button"
        :class="styles"
        @click="() => handleRemove(todo.id)"
      >
        delete
      </button>
      <button
        type="button"
        :class="styles"
        @click="() => handleUpdate(todo.id, true)"
      >
        update
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useTodoStore } from "@/stores/todo.store";

// eslint-disable-next-line prettier/prettier
const styles =
  "first:mr-5 py-1 px-2 text-white rounded-sm bg-slate-700 hover:scale-105 hover:transition-all";

export default defineComponent({
  name: "Todo",
  props: ["todo"],
  // emit: ["handleRemove", "handleUpdate"],
  setup(_, { emit }) {
    // const emit = defineEmits<{
    //   (e: "handleRemove", id: number): void;
    //   (e: "handleUpdate", id: number, isUpdate: boolean): void;
    // }>();
    const todoStore = useTodoStore();

    onMounted(() => {
      // $reset();
    });

    function handleRemove(id: number) {
      emit("handleRemove", id);
    }
    function handleUpdate(id: number, isUpdate: boolean) {
      todoStore.$patch((state) => {
        state.idUpdate = id;
      });
      emit("handleUpdate", id, isUpdate);
    }

    return {
      handleRemove,
      handleUpdate,
      styles,
    };
  },
});
</script>
