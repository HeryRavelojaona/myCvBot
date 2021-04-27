import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answer:[
      { 
        question : 'Qui es tu ?',
        response : "Je m'appelle Hery Ravelojaona",
        user : "server"
      },
      { 
        question : "Quel es ton nom ?",
        response : "Je m'appelle Hery Ravelojaona",
        user : "server"
      },
      { 
        question : "Qui heure es t'il",
        response : "Je m'appelle Héry ",
        user : "server"
      }
    ]
  },
  mutations: {
    SET_ANSWER: (state, answers) => state.answers = answers,
  }
})
