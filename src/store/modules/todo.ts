const state = () => ({
  todos: [] as any,
  isUpdate: null,
  count: 0,
});

const getters = {
  getListTodos: (state: any) => {
    return state.todos;
  },
};

const mutations = {
  addTodo(state: any, item: any) {
    state.todos.push(item);
  },
  removeTodo(state: any, payload: any) {
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
  increment(state: any) {
    state.count++;
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
  increment({ commit, state }) {
    state.count++;
    // commit("increment");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
