import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    mutateUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    getUsers({ commit }) {
      commit('mutateUsers', JSON.parse(localStorage.getItem('users')));
    },
    setUsers({ commit }, users) {
      localStorage.setItem('users', JSON.stringify(users));
      commit('mutateUsers', users);
    },
    setJsonUsers({ commit }, users) {
      localStorage.setItem('users', users);
      commit('setJsonUsers', JSON.parse(users));
    },
  },
});
