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
            <div class="modal-content">
                <Questions :question="sendQuestion" />
            </div>
            <div class="modal-footer">
                <label for="question"></label>
                <input type="text" v-model="question" name="question">
                <button @click="sendMessage">
                    send
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import Questions from './Questions'
export default {
  name: 'Bot',
  components :{
      Questions
  },
  data() {
      return {
          question: '',
          sendQuestion: ''
      }
  },
  methods: {
      sendMessage(){
          this.sendQuestion = this.question;
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
        min-height: 60vh;
        padding: 10px;
        background: #000;
        color: #fff;
    }
    
    .modal-header, .modal-footer {
        position: relative;
        background-color: #fff;
        color: #000;
        padding: 20px 0;
    }

    .modal-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            border: 1px solid;
            height: 30px;
            width: 80%;
        }
        img {
            height: 30px;
        }
        
    }

}
</style> scoped>

</style>