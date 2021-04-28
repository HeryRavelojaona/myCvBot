<template>
    <div id="bot">
        <!-- Trigger/Open The Modal -->
        <button id="myBtn">Une question ?</button>
        <!-- The Modal -->
        <div id="myModal" class="modal">
            <div class="modal-header">
                <button class="close">&times;</button>
                <h2>Des questions ?</h2>
            </div>
            <div class="modal-content" ref="chatBox">
                <div id="questions">
                    <p class="server" v-if="autoQuestion.nb">{{ autoQuestion.text }}</p>
                    <p :class="response.user" v-for="response, index in responses" :key="index"> {{ response.question }} </p>
                    <p class="server" v-if="errorAnswer">Désolé je n'ai pas la réponse, n'hésitez pas à me contacter
                        <span class="contact">
                            <a href="mailto:contact@heryravelojaona.fr"><img src="../assets/mail.svg.png" alt="email"> </a>
                            <a href="tel:0609934256"><img src="../assets/images.png" alt="téléphone"></a>
                        </span>
                    </p>
                    
                </div>
                
            </div>
            <div class="modal-footer">
                <div class="send">
                    <form action="" @submit.prevent="sendMessage">
                        <label for="question"></label>
                        <input type="text" v-model="question" name="question">
                        <input type="hidden" :value="autoQuestion.nb" ref="step" name="step">
                        <button type="submit">

                            <img src="../assets/send.svg" alt="envoyer le message">
                        </button>
                    </form>
                </div>
                <span class="error" v-if="error">{{ error }}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Bot',
  data() {
      return {
          question: '',
          responses: [],
          error: null,
          answers: {},
          showResponse: false,
          results: [],
          errorAnswer: false,
          autoBot: [],
          autoQuestion:{
              text: '',
              nb: null
          },
          step: null
      }
  },
  mounted(){
      // get array question
      this.answers = this.$store.state.answer;
      //get result response
      this.results = this.$store.state.results;
      //get auto question
      this.autoBot = this.$store.state.autoBot;
     //first question
      this.autoQuestion.text = this.autoBot[0];
      this.autoQuestion.nb = 1;
  },
  methods: {
        sendMessage(){
            this.$store.commit('UPDATE_STEP');
          /*if(this.question.length >= 2 ){
            //push the question
            this.responses.push(
                {
                    question : this.question,
                    user : 'client'
                }
            );
            //check if stepes Number
            let steps = this.checkSteps(this.$refs.step.value);
            if(steps){
                console.log('ok')
                return;
            }
            //Check if response and push the response
            setTimeout(()=>{
                // split quastion
                let splitQuestion = this.question.toLowerCase().split(' ');
                console.log(splitQuestion);
                //Loop in server 
                this.answers.forEach(element => {
                    if(splitQuestion.includes(element.question.toLowerCase())){
                            this.responses.push(
                                {
                                    question : this.results[element.response],
                                    user : element.user
                                }
                            )
                        this.errorAnswer = false;
                    }else if(!element.response) {
                            this.errorAnswer = true;
                        }
                });
                
                //Auto scroll chat Box
                this.$nextTick(()=> {
                    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
                })
                //reset input
                this.question = "";
    
            }, 1000);

            this.error = null; 
          }else {
              this.error = "Vous aviez une question ?"
          }*/
          
      },
      checkSteps(step){
          if(step && step == 1){
            setTimeout(()=>{
                // split quastion
                let splitQuestion = this.question.toLowerCase().split(' ');
                console.log(splitQuestion);
                //Loop in server 
                this.autoBot.forEach(element => {
                    if(splitQuestion.includes(element.question.toLowerCase())){
                            this.responses.push(
                                {
                                    question : this.autoResults[element.response],
                                    user : element.user
                                }
                            )
                        this.errorAnswer = false;
                    }else if(!element.response) {
                            this.errorAnswer = true;
                        }
                });
                
                //Auto scroll chat Box
                this.$nextTick(()=> {
                    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
                })
                //reset input
                this.question = "";
    
            }, 1000);
          }
      }
  }
}
</script>

<style lang="scss" scoped>
#bot {
    width: 300px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    button {
            border: none;
            outline: none;
            background-color: inherit;
            cursor: pointer;
    }
    #myModal {
        border: 1px solid;
        border-radius: 3px;
        box-shadow: 2px 2px 2px 2px  #fff;
        margin:20px 0;
        .close {
            position: absolute;
            top: 2px;
            right: 10px;
            font-size: 1.8em;
        }
    }
    .modal-content {
        height: 60vh;
        padding: 10px;
        background: #000;
        color: #fff;
        overflow-y: scroll;
        z-index: 3;
    }
    
    .modal-header, .modal-footer {
        position: relative;
        background-color: #fff;
        color: #000;
        padding: 20px 0;
    }

    .modal-footer {
        display: flex;
        flex-direction: column;
        border-top: 12px solid #000;
        margin-top: -3px;
        input {
            border: 1px solid;
            height: 30px;
            width: 80%;
        }
        img {
            width: 30px;
        }
        .error{
            margin-top: 7px;
            font-size: 0.9em;
            color: red;
        }
        
    }
    #questions {
        p {
            width: 80%;
            padding: 5px;
            border-radius: 6px;
            &.client {
                float: right;
                text-align: right;
                background-color: red;
            }
            &.server {
                text-align: left;
                background-color: #fff;
                color: #000;
                float: left;
            }
            &:last-child {
                padding: 10px 5px;
            }
        }
    }
    .contact {
        padding:  5px;
        display: flex;
        justify-content: center;
        a {
        margin: 0 15px;
        }
        img {
        width: 30px;
        }
    }

}
</style> scoped>

</style>