import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    results: [
      "Je m'appelle Hery Ravelojaona",
      "J'ai 36 ans",
      "Titre RNCP niveau 5 de développeur web depuis 2020",
      "Je suis plus orienté Front-end, mais je suis ouvert à tout",
      "VueJs / ReactJs / Javascript / PHP / Symfony / Twig / Sql / Html / Css / SASS / Bulma / Bootsrap / Wordpress",
      "hery@heryravelojaona.fr ou 06 09 93 42 56",
      "DÉVELOPPEUR - FREELANCE TÉLÉTRAVAIL  Décembre 2020  Aujourd’hui",
      "A Vaires sur marne en Seine et marne (77)",
      "Le développement web, l'ébénisterie et plein d'autre chose. Contactez-moi que l'on en discute"

    ],
    autoBot: [
      {
        text: "Bonjour, comment allez vous ?",
        choices: false
      },
      {
        text: "Que souhaitez savoir sur moi ?",
        choices: true
      }
    ],
    questions: [
      //How are you good

      {
        question : 'ça va bien',
        response : 0,
        user : "server"
      },
      {
        question : 'ça va',
        response : 0,
        user : "server"
      },
 
      {
        question : 'bien',
        response : 0,
        user : "server"
      },
      //How are you bad
      {
        question : 'mal',
        response : 1,
        user : "server"
      },
      {
        question : 'pas',
        response : 1,
        user : "server"
      }
    ],
    answers: [
      "J'en suis très content, moi aussi je vais bien",
      "Ca ira mieux demain"
    ],
    choices: [
        {
          text: "Qui suis-je ?",
          id: 1,
          type: "question"
        },
        {
          text: "Ma formation ?",
          id: 2,
          type: "question"
        },
    ]
  },
  mutations: {
    SET_ANSWER: (state, answers) => state.answers = answers,
    UPDATE_STEP: (state) => state.step ++,
  }
})
