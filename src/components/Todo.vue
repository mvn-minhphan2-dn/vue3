<template>
  <li>
    <router-link :to="{ name: 'about', params: { id: todo.id } }">{{
      todo.name
    }}</router-link>
    <button type="button" class="mr-20" @click="() => handleDelete(todo.id)">
      delete
    </button>
    <button type="button" @click="() => handleUpdate(todo.id, true)">
      update
    </button>
  </li>
</template>

<script lang="ts">
export default {
  name: "Todo",
  props: ["todo"],
  setup() {},
  mounted() {},

  methods: {
    handleDelete(id: number) {
      console.log(121212212);

      this.$emit("deleteTodo", id);
    },
    handleUpdate(id: number, isUpdate: boolean) {
      this.$emit("updateTodo", id, isUpdate);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  &.mr-20 {
    margin-right: 20px;
  }
}
</style>
