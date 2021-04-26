import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answer:[{ hery : 'moi'}]
  },
  mutations: {
    SET_ANSWER: (state, answers) => state.answers = answers,
  }
})
