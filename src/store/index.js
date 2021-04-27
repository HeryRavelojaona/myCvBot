import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answer:[
      { 
        question : 'Qui es tu ?',
        response : 0,
        user : "server"
      },
      { 
        question : "Quel est ton nom ?",
        response : 0,
        user : "server"
      },
      { 
        question : "comment t'appelles-tu ?",
        response : 0,
        user : "server"
      },
      { 
        question : "comment t'appelles tu ?",
        response : 0,
        user : "server"
      },
      { 
        question : "comment tu t'appelles ?",
        response : 0,
        user : "server"
      },
      { 
        question : "comment tu t'appel ?",
        response : 0,
        user : "server"
      },
      //Age
      { 
        question : "Quel âge as tu ?",
        response : 1,
        user : "server"
      },
      { 
        question : "Quel age as tu ?",
        response : 1,
        user : "server"
      },
      { 
        question : "Tu as quel age ?",
        response : 1,
        user : "server"
      },
      { 
        question : "Tu as quel âge ?",
        response : 1,
        user : "server"
      },
      //Diplome
      { 
        question : "as tu un diplôme ?",
        response : 2,
        user : "server"
      },
      { 
        question : "as tu un diplome ?",
        response : 2,
        user : "server"
      },
      { 
        question : "quel diplome as tu ?",
        response : 2,
        user : "server"
      },
      { 
        question : "quel diplôme as-tu ?",
        response : 2,
        user : "server"
      },
      //Année de diplome
      { 
        question : "depuis quand es tu diplômé ?",
        response : 3,
        user : "server"
      },
      { 
        question : "depuis quand es-tu diplômé ?",
        response : 3,
        user : "server"
      },
    ],
    results: [
      "Je m'appelle Hery Ravelojaona",
      "J'ai 36 ans",
      "Titre RNCP niveau 5 de développeur web",
      "Depuis 2019"
    ]
  },
  mutations: {
    SET_ANSWER: (state, answers) => state.answers = answers,
  }
})
