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
                    <p :class="response.user" 
                        v-for="response, index in responses" 
                        :key="index"> 

                        {{ response.question }}
                        
                        <span class="btn-choice" v-if="response.choices">
                            <div class="button choice" v-for="choice in choices" :key="choice.id">
                                 <button v-if="choice.type == 'question'"  @click.prevent="handleChoice(choice.id)" >{{ choice.text }}</button>
                            </div>
                        </span>
                        <span class="btn-choice" v-else-if="response.validation">
                            <div>
                                 <button class="validation" @click="handleValidation(true)">Oui</button>
                                 <button class="validation" @click="handleValidation(false)">Non</button>
                            </div>
                        </span>
                    </p>
                    <p class="server" 
                        v-if="errorAnswer">

                            Désolé <span v-if="userName">{{ userName }}</span> je n'ai pas la réponse, n'hésitez pas à me contacter
                        <span class="contact">
                            <a href="mailto:contact@heryravelojaona.fr"><img src="../assets/mail.svg.png" alt="email"> </a>
                            <a href="tel:0609934256"><img src="../assets/images.png" alt="téléphone"></a>
                        </span>
                    </p> 
                </div>
                
            </div>
            <div class="modal-footer">
                <div class="send" v-if="userInput">
                    <form action="" @submit.prevent="sendMessage">
                        <label for="question"></label>
                        <input type="text" v-model="question" name="question" :placeholder="textHolder">
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
          choices: [],
          errorAnswer: false,
          autoBot: [],
          step: null,
          questions:[],
          action: null,
          userInput: false,
          textHolder: '',
          error: null,
          choiceResponses: null,
          userName: null
      }
  },
  computed:{
      checkStep(){
          if(this.step == 1){
              this.action = true;
          }
          this.step = this.$store.state.step;
      }
  },
  mounted(){
    //get auto question
    this.autoBot = this.$store.state.autoBot;
    //get questions
    this.questions = this.$store.state.questions;
    //Mulptiple choice button
    this.choices = this.$store.state.choices;
    //first question
    this.step = this.$store.state.step;
    //Choice Response
    this.choiceResponses = this.$store.state.choiceResponses;
    //fisrt question
    this.responses.push( {  question : this.autoBot[this.step].text,
                            choices : this.autoBot[this.step].choices,
                            validation : this.autoBot[this.step].validation,
                            user : 'server'})
  },
  methods: {
        sendMessage(){

            if(this.question.length >= 2 ){
                //initial step
                if(this.step == 0) {
                    if(this.userInput){
                        this.$store.commit('SET_USERNAME', this.question);
                        this.responses.push(
                            {
                                question : "Enchanté de vous connaitre "+this.$store.state.userName+" ",
                                user : 'server'
                            }
                        );
                        this.question = "";
                        this.userInput = false;
                    }else {
                        this.responses.push(
                            {
                                question : "Ca ne fait rien",
                                user : 'server'
                            }
                        );
                    }
                }
                //push the question
                else {
                    this.responses.push(
                        {
                            question : this.question,
                            user : 'client'
                        }
                    );
                    // split question
                    let splitQuestion = this.question.toLowerCase().split(' ');
                    const questions = this.questions;
                    setTimeout(()=> {
                        for( const element of questions){
                            if(splitQuestion.includes(element.question.toLowerCase())){
                                this.errorAnswer = false;
                                    this.responses.push(
                                        {
                                            question : element.response,
                                            user : element.user,
                                        }
                                    )
                                
                                this.question = "";
                                this.autoScroll();
                                break;  
                                
                            }else {
                    
                                this.errorAnswer = true;
                                this.autoScroll();       
                            }    
                              
                        }
                    }, 1000);  
                }
               
                //Update step
                if(this.step < 1){
                    this.$store.commit('AUTO_UPDATE_STEP');
                    this.step = this.$store.state.step;
                }
                
                setTimeout(()=> {
                    this.responses.push(
                        {
                            question : this.autoBot[this.step].text,
                            choices : this.autoBot[this.step].choices,
                            user : 'server',
                            validation : this.autoBot[this.step].validation 
                        }
                    )
                }, 1500);
                //autosroll
                this.autoScroll();
            }
      },
      //autoScroll
    autoScroll(){
        this.$nextTick(()=> {
                this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
            }) ;
    },
            
    //Question selected with button validation
    //If true open User Input
    handleValidation(boolean){
        if(boolean){
            this.userInput = true;
            if(this.step == 0){
                this.textHolder = "Veuillez entrer votre prénom ici"
            }
        }else {
            this.userInput = false;
            this.question = "Ca ne fait rien";
            //autosroll
            this.autoScroll();
            this.sendMessage();
            this.question = "";
        }
    },
    handleChoice(id){
        if(id == 7) {
            this.handleValidation(true);
            return;
        }
        let timer = 5000;
        setTimeout(()=> {
            this.responses.push(
                            {
                                question : this.choiceResponses[id].text,
                                validation: this.choiceResponses[id].validation,
                                user : 'server'
                            }
                        );
            //autosroll
            this.autoScroll();
        }, 1000);

        //If id === 1 Multiple response
        if(id == 1) {
            timer = 10000;
            setTimeout(()=> {
                this.responses.push(
                            {
                                question : this.choiceResponses[id + 1].text,
                                validation: this.choiceResponses[id + 1].validation,
                                user : 'server'
                            }
                        );
                //autosroll
                this.autoScroll();
            }, 3500)
            setTimeout(()=> {
                this.responses.push(
                            {
                                question : this.choiceResponses[id + 2].text,
                                validation: this.choiceResponses[id + 2].validation,
                                user : 'server'
                            }
                        );
                //autosroll
                this.autoScroll();
            }, 5500)
            setTimeout(()=> {
                this.responses.push(
                            {
                                question : this.choiceResponses[id + 3].text,
                                validation: this.choiceResponses[id + 3].validation,
                                user : 'server'
                            }
                        );
                //autosroll
                this.autoScroll();
            }, 7500)
        }
        
        //Show choices again
        setTimeout(()=> {
            this.responses.push(
                    {
                        question : this.autoBot[1].text,
                        choices : this.autoBot[1].choices,
                        user : 'server',
                        validation : this.autoBot[1].validation 
                    }
                )
                //autosroll
            this.autoScroll();
        }, timer);
        
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
            padding: 8px;
            border-radius: 6px;
            text-align: justify;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            &.client {
                float: right;
                background-color: red;
            }
            &.server {
                background-color: #fff;
                color: #000;
                float: left;
            }
            &:last-child {
                padding: 10px;
                line-height: 1.4em;
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
    .btn-choice {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .choice {
            background: red;
            margin: 5px;
            
            border-radius: 3px;
        }
        button {
            padding: 10px;
            width: 100%;

            height: 100%;
            
        }
        .validation {
            background: red;
            margin: 5px 0;
            border-radius: 3px;
            &:first-child{
                background: grey;
            }
        }  
    }
  

}
</style> scoped>

</style>