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
                    <p :class="response.user" v-for="response, index in responses" :key="index"> {{ response.question }} </p>
                </div>
                
            </div>
            <div class="modal-footer">
                <div class="send">
                    <form action="" @submit.prevent="sendMessage">
                        <label for="question"></label>
                        <input type="text" v-model="question" name="question">
                        <button type="submit">
                            send
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
          showResponse: false
      }
  },
  mounted(){
      this.answers = this.$store.state.answer;
  },
  methods: {
        sendMessage(){
          if(this.question.length > 3){
            //push the question
            this.responses.push(
                {
                    question : this.question,
                    user : 'client'
                }
            );
            //Check if response and push the response
            setTimeout(()=>{
                this.answers.forEach(element => {
                    if(element.question.toLowerCase().includes(this.question.toLowerCase())){
                        this.responses.push(
                            {
                                question : element.response,
                                user : element.user
                            }
                        )
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
              this.error = 'Vous aviez une question ?'
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
        input {
            border: 1px solid;
            height: 30px;
            width: 80%;
        }
        img {
            height: 30px;
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
    }
}

}
</style> scoped>

</style>