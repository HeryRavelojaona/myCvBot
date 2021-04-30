<template>
    <div id="bot">
        <!-- Trigger/Open The Modal -->
        <button id="myBtn"></button>
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
                        <span class="btn-choice" v-if="response.choices && userName">Alors {{ userName }} allons-y.</span>
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
                    <div class="loader" v-if="isLoaded"><div></div><div></div><div></div><div></div></div>
                    <p class="server" 
                        v-if="errorAnswer">
                            Désolé <span v-if="userName">{{ userName }}</span> je n'ai pas la réponse, n'hésitez pas à le contacter
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
          userName: null,
          isLoaded: false
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
        this.isLoaded = true;
        if(this.question.length >= 2 ){
            //initial step
            if(this.step == 0) {
                if(this.userInput){
                    this.$store.commit('SET_USERNAME', this.question);
                    this.userName = this.$store.state.userName;
                    this.responses.push(
                        {
                            question : "Enchanté de vous connaitre "+this.$store.state.userName+" ",
                            user : 'server'
                        }
                    );
                    this.question = "";
                    this.textHolder = "";
                    this.userInput = false;
                }else {
                    this.responses.push(
                        {
                            question : "Ca ne fait rien",
                            user : 'server'
                        }
                    );
                    this.textHolder = "";
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
            this.isLoaded = false; 
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
            }, 2000);
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
        //Questions
        if(id == 7) {
            this.handleValidation(true);
            return;
        }
        //Meteo call
        if(id == 8) {
            this.callMeteo();
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
    },
    async callMeteo(){
        this.isLoaded = true; 
        //Get user Ip
        const ip = await fetch('https://geo.ipify.org/api/v1?apiKey=at_TeJgRnmL1ADd8biyNxDbNZGt9KiIS&')
                    .then(resultat => resultat.json())
                    .then(json => json.ip);

        //Get city with user ip
        const city = await fetch('https://freegeoip.app/json/' + ip)
                    .then(res => res.json())
                    .then(json => json.city);

        //Get region with user ip if !city data
        const region = await fetch('https://freegeoip.app/json/' + ip)
        .then(res => res.json())
        .then(json => json.region_name);

        let requestCity = region;
        if(city) {
            requestCity = city;
        }

        //Get Weather info
        const meteo = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+requestCity+"&appid=b3e0381a5b14fed6a476c05c735c45f1&lang=fr&units=metric") 
                            .then(res => res.json())
                            .then(json => json)

        if(meteo) {
            const name = meteo.name;
            const temperature = meteo.main.temp;
            const description = meteo.weather[0].description;
        
            let response = "Il fait actuellement "+ Math.round(temperature)+"° à " + name + " avec " + description 
            this.responses.push(
                            {
                                question : response ,
                                user : 'server'
                            }
                        );
                //autosroll
                this.autoScroll();
        }else {
            this.errorAnswer = true;
        }
        this.isLoaded = false; 

    
    }
 
  }
}
</script>

<style lang="scss" scoped>
#bot {
    width: 300px;
    height: 100vh;
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
        .loader {
            /*position: absolute;
            z-index: 99;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;*/
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
            div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 64px;
                height: 64px;
                margin: 8px;
                border: 8px solid #fff;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #fff transparent transparent transparent;
            }
            div:nth-child(1) {
                animation-delay: -0.45s;
            }
            div:nth-child(2) {
                animation-delay: -0.3s;
            }
            div:nth-child(3) {
                animation-delay: -0.15s;
            }
            @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
        button {
            color: #fff;
            font-size: 1em;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
    }
    
    .modal-header, .modal-footer {
        position: relative;
        background-color: #fff;
        color: #000;
        padding: 20px 0;
    }

    .modal-footer {
        form {
            width: 100%;
        }
        display: flex;
        flex-direction: column;
        border-top: 12px solid #000;
        margin-top: -3px;
        input {
            border: 1px solid;
            height: 30px;
            width: 85%;
        }
        .send {
            display: flex;
            flex-direction: row;
        }
        img {
            width: 25px;
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
                color: #fff;
                background: grey;
            }
        }  
    }
    
  

}

</style> scoped>

</style>