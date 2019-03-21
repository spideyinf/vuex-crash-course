import axios from 'axios';

const state = {
  todos: [
    {
      id: 1,
      title: 'Todo One'
    },
    {
      id: 2,
      title: 'Todo Two'
    }
  ]
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    });
    commit('newTodo', res.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    // Get selected option as value
    const limit = e.target.options[e.target.options.selectedIndex].innerText;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit('setTodos', res.data);
  },
  async updateTodo({ commit }, updateTodo) {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo
    );
    commit('updateTodo', res.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id)
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
