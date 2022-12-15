<template>
  <div>
    <input ref="inputField" type="text" />
    <button type="button" @click="state.isAdd ? addTodo() : handleUpdateTodo()">
      {{ state.isAdd ? "Add" : "Update" }}
    </button>
  </div>

  <div class="show-list">
    <TransitionGroup name="list" tag="ul">
      <Todo
        v-for="(todo, index) in todos"
        :todo="todo"
        :key="index"
        @deleteTodo="deleteTodo"
        @updateTodo="updateTodo"
      />
    </TransitionGroup>
  </div>
  <router-view />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  watch,
} from "vue";
import { useStore } from "vuex";
import Todo from "@/components/Todo.vue";
import { useTodoStore } from "@/stores/todo";

const module = "todo";

export default defineComponent({
  name: "App",
  components: {
    Todo,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = useStore();
    const state = reactive({
      isAdd: true,
      idTodoUpdate: 0,
    });
    const todoss = useTodoStore();
    let todos: any = computed(function () {
      return store.getters[`${module}/getListTodos`];
    });
    function addTodo(): void {
      console.log(todoss.getListTodos);
      const input = instance?.refs.inputField as HTMLInputElement;
      if (input.value) {
        const newData = {
          id: todos?.value?.length + 1,
          name: input.value,
        };
        store.dispatch("todo/addTodo", newData);
        input.value = "";
        (input as HTMLInputElement).focus();
      }
    }
    function deleteTodo(todoId: number) {
      store.dispatch(`${module}/removeTodo`, todoId);
    }
    function updateTodo(todoId: number, isUpdate: boolean) {
      state.idTodoUpdate = todoId;
      const input = instance?.refs.inputField as HTMLInputElement;
      const todoWithId = todos?.value?.find((todo: any) => todo.id === todoId);
      input.value = todoWithId.name;
      state.isAdd = !isUpdate;
    }
    function handleUpdateTodo() {
      const input = instance?.refs.inputField as HTMLInputElement;
      const nameTodo = input.value;
      store.dispatch({
        type: `${module}/updateTodo`,
        todoId: state.idTodoUpdate,
        nameTodo,
      });
      input.value = "";
      state.isAdd = true;
    }
    watch(state, (value) => {
      console.log(value);
      {
        true;
      }
    });

    return {
      state,
      todos: todos,
      addTodo,
      deleteTodo,
      updateTodo,
      handleUpdateTodo,
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
