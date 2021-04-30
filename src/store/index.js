import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    userName: null,
    questions: [
      {
        question: "va",
        response: "Je vais bien merci",
        user: "server"
      },
      {
        question: "comment tu va?",
        response: "Je vais bien merci",
        user: "server"
      },
      {
        question: "allez",
        response: "Je vais bien merci",
        user: "server"
      },
      {
        question: "blague",
        response: "Je ne suis pas très drôle mais Hery pourra vous en raconter",
        user: "server"
      }
    ],
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
          text: "Qui est-il ? (en bref)",
          id: 0,
          type: "question"
        },
        {
          text: "Quels langages connait-il ?",
          id: 1,
          type: "question"
        },
        {
          text: "Connaissances complémentaires",
          id: 5,
          type: "question"
        },
        {
          text: "Qualités",
          id: 6,
          type: "question"
        },
        {
          text: "Autres questions",
          id: 7,
          type: "question",
          validation: true
        }
    ],
    choiceResponses : [
      {
        text: `Hery Ravelojaona ( oui je sais, son nom est compliqué à prononcé mais vous allez vous y habitué) 36 ans, habites en région parisienne dans le département de la Seine et Marne. En 2019 il a décidé de faire une reconversion professionnelle afin devenir développeur web. Avec une formation qui demandait de l'autonomie et beaucoup de détermination il a réussi à obtenir son dîplome. Il est devenu passionné par le 
        développement et convaincu qu'il souhaitai en faire son métier. Pour en savoir plus n'hésitez pas à le contacter il échangera avec vous avec plaisir.`,
        validation: false
      },
      {
        text: `
        Avec une préference pour la partie développement front-end, il reste ouvert à tout autre apprentissage.`,
        validation: false
      },
      {
        text: `Stack front-end: Vuejs / NuxtJs / Reactjs / Javascript / Jquery / Requête http / Html5 / Css3 / Sass / Twig / Bootstrap / Bulma / Responsive web design`,
        validation: false
      },
      {
        text: `Stack back-end: PHP / Symfony / Sql / MongoDb / NodeJs /Swift Mailer`,
        validation: false
      },
      {
        text: `Autres: Wordpress / Shopify / Snipcart`,
        validation: false
      },
      {
        text: `Code review / Git-Github / Slack / Méthode Agile Kanban /  VsCode / Photoshop / Illustrator / W3c validator / AChecker Web accessibility / API / SEO  `,
        validation: false
      },
      {
        text: `Entrepreneuriat / Esprit d'équipe / Communication / Organisation / Compréhension du besoin client / Proactif / Curieux / Sérieux / Polyvalent / A l'écoute `,
        validation: false
      }
      
    ]
  },
  mutations: {
    SET_USERNAME: (state, userName) => state.userName = userName,
    AUTO_UPDATE_STEP: (state) => state.step ++,
    UPDATE_STEP: (state, step) => state.step = step
  }
})
