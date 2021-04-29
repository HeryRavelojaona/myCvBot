import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    userName: null,
    autoBot: [
      {
        text: "Bonjour, je suis IRI l'assistant d'Hery. J'espère que vous allez bien. Puis-je connaitre votre prénom ?",
        validation: true,
        choices: false
      },
      {
        text: "Que souhaitez savoir sur lui ?",
        choices: true,
        validation: false
      }
    ],
    choices: [
        {
          text: "Qui est-il ?",
          id: 0,
          type: "question"
        },
        {
          text: "Sa formation ?",
          id: 1,
          type: "question"
        },
    ],
    choiceResponses : [
      {
        text: "Hery Ravelojaona ( oui je sais, son nom est compliqué à prononcé mais vous allez vous y habitué) 36 ans, il habites en région parisienne dans le département de la Seine et Marne.",
        validation: false,
        audio: true
      }
      
    ]
  },
  mutations: {
    SET_USERNAME: (state, userName) => state.userName = userName,
    UPDATE_STEP: (state) => state.step ++,
  }
})
