<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="mb-10 text-[50px] font-extrabold underline text-red-500">
      Todo List
    </h1>
    <section class="w-[50%] p-10 shadow-xl rounded-lg transition-all">
      <div class="flex mb-4">
        <input
          ref="inputRef"
          @keyup.enter="handleAddOrUpdateTodo"
          type="text"
          class="flex-1 px-2 py-1 text-black border-2 outline-0"
        />
        <button :class="styles" type="button" @click="handleAddOrUpdateTodo">
          {{ !todoStore.$state.idUpdate ? "Add" : "Update" }}
        </button>
        <button
          :class="styles"
          type="button"
          @click="handleCancel"
          v-if="todoStore.$state.idUpdate"
        >
          Cancel
        </button>
      </div>
      <div class="show-list">
        <!-- <TransitionGroup name="list" tag="ul"> -->
        <!-- </TransitionGroup> -->
        <Todo
          v-for="(todo, index) in todos"
          :todo="todo"
          :key="index"
          @handleRemove="(id) => remove(id)"
          @handleUpdate="showInfoUpdate"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  // reactive,
  watch,
  onMounted,
  ref,
  computed,
  watchEffect,
} from "vue";
import Todo from "@/components/Todo.vue";
import { useTodoStore } from "@/stores/todo.store";
// import GuestBookService from "@/services/GuestBookService";
import { storeToRefs } from "pinia";
// import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@/stores/auth.store";

// eslint-disable-next-line prettier/prettier
const styles =
  "first:mr-4 py-1 px-4 ml-5 text- border-2 bg-slate-700 text-white hover:scale-105 hover:transition-all";

export default defineComponent({
  name: "Home",
  components: {
    Todo,
  },
  setup() {
    const todoStore = useTodoStore();
    const { add, remove, update, $reset } = todoStore;
    const { getListTodos } = storeToRefs(todoStore);
    const { getMe } = storeToRefs(useAuthStore());

    // const { fetchStatus: fetchStatusGB, data: dataGB } = useQuery({
    //   queryKey: ["guestBook"],
    //   queryFn: async () => await GuestBookService.getAll(),
    // });

    const inputRef = ref<any>(null);
    const guestBookData = ref<any>([]);

    onMounted(async () => {});

    function showInfoUpdate(todoId: number) {
      let inputValue = inputRef?.value;
      const todoWithId = computed(() => {
        return getListTodos?.value?.find((todo: any) => todo.id === todoId);
      });
      inputValue.value = todoWithId.value!.name;
    }
    function handleAddOrUpdateTodo() {
      const nameTodo = inputRef?.value?.value?.trim();
      if (nameTodo) {
        if (!todoStore.$state?.idUpdate) add(nameTodo);
        else update(nameTodo);
      }
      inputRef.value!.value = "";
    }
    function handleCancel() {
      inputRef.value!.value = "";
      $reset();
    }

    watch(
      () => todoStore,
      ({getListTodos, $state}) => {},
      { deep: true }
    );

    watchEffect(() => {
      inputRef?.value && inputRef?.value!.focus();
    });

    return {
      todoStore,
      todos: getListTodos,
      showInfoUpdate,
      guestBookData,
      inputRef,
      getMe,
      handleAddOrUpdateTodo,
      handleCancel,
      styles,
      remove,
      // fetchStatusGB,
      // dataGB,
    };
  },
});
</script>
<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
