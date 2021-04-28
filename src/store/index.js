import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    answer:[
      { 
        question : 'Qui es tu ?',
        response : 0,
        user : "server"
      },
      { 
        question : "nom",
        response : 0,
        user : "server"
      },
      { 
        question : "t'appelles-tu ?",
        response : 0,
        user : "server"
      },
      { 
        question : "t'appelles",
        response : 0,
        user : "server"
      },
      { 
        question : "t'appel",
        response : 0,
        user : "server"
      },
      { 
        question : "appelles",
        response : 0,
        user : "server"
      },
      //Age
      { 
        question : "âge",
        response : 1,
        user : "server"
      },
      { 
        question : "age",
        response : 1,
        user : "server"
      },

      //Diplome
      { 
        question : "diplôme",
        response : 2,
        user : "server"
      },
      { 
        question : "diplome",
        response : 2,
        user : "server"
      },
      { 
        question : "diplomes",
        response : 2,
        user : "server"
      },
      { 
        question : "diplômes",
        response : 2,
        user : "server"
      },
      //spécialité
      { 
        question : "spécialité",
        response : 3,
        user : "server"
      },
      { 
        question : "Front-end",
        response : 3,
        user : "server"
      },
      { 
        question : "Front",
        response : 3,
        user : "server"
      },
      //langage
      { 
        question : "langage",
        response : 4,
        user : "server"
      },
      { 
        question : "languages",
        response : 4,
        user : "server"
      },
      { 
        question : "language",
        response : 4,
        user : "server"
      },
      { 
        question : "langages",
        response : 4,
        user : "server"
      },
      { 
        question : "Framework",
        response : 4,
        user : "server"
      },
      //Ton email
      { 
        question : "mail",
        response : 5,
        user : "server"
      },
      { 
        question : "email",
        response : 5,
        user : "server"
      },
      { 
        question : "contactez",
        response : 5,
        user : "server"
      },
      { 
        question : "contact",
        response : 5,
        user : "server"
      },
      { 
        question : "numéro",
        response : 5,
        user : "server"
      },
      { 
        question : "numero",
        response : 5,
        user : "server"
      },
      { 
        question : "téléphone",
        response : 5,
        user : "server"
      },
      //exp
      { 
        question : "expérience",
        response : 6,
        user : "server"
      },
      { 
        question : "expériences",
        response : 6,
        user : "server"
      },
      { 
        question : "experience",
        response : 6,
        user : "server"
      },
      //adresse
      { 
        question : "habites",
        response : 7,
        user : "server"
      },
      { 
        question : "habites-tu",
        response : 7,
        user : "server"
      },
      { 
        question : "habite",
        response : 7,
        user : "server"
      },
      { 
        question : "adresse",
        response : 7,
        user : "server"
      },
      //loisirs
      { 
        question : "loisirs",
        response : 8,
        user : "server"
      },
      { 
        question : "hobbys",
        response : 8,
        user : "server"
      },
      { 
        question : "hobby",
        response : 8,
        user : "server"
      },
      //Pourquoi
      { 
        question : "pourquoi",
        response : 8,
        user : "server"
      }
    ],
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
      "Bonjour, comment allez vous ?"
    ]
  },
  mutations: {
    SET_ANSWER: (state, answers) => state.answers = answers,
    UPDATE_STEP: (state) => state.step ++,
  }
})
