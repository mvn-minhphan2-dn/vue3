const state = () => ({
  todos: [],
  isUpdate: null,
});

const getters = {
  getListTodos: (state: any) => {
    return state.todos;
  },
};

const mutations = {
  addTodo(state: { todos: any[] }, item: any) {
    state.todos.push(item);
  },
  removeTodo(state: { todos: any[] }, payload: any) {
    const index = state.todos.findIndex(
      (todo: { id: any }) => todo.id === payload
    );
    state.todos.splice(index, 1);
  },
  updateTodo(state: any, payload: any) {
    const index = state.todos.findIndex(
      (todo: { id: number }) => todo.id === payload?.todoId
    );
    return [(state.todos[index].name = payload.nameTodo)];
  },
};

const actions = {
  addTodo(context: any, payload: any) {
    context.commit("addTodo", payload);
  },
  removeTodo(context: any, payload: any) {
    context.commit("removeTodo", payload);
  },
  updateTodo(context: any, payload: any) {
    context.commit("updateTodo", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
