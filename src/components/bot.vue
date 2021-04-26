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
                <Question class="questionStyle" :question="ques" />
            </div>
            <div class="modal-footer">
                <label for="question"></label>
                <input type="text" ref="question" name="question">
                <button @click="send">
                    <img alt="send question" src="../assets/filled-sent.png">
                </button>
            </div>
        </div>

    </div>
</template>

<script>

import Question from './Question.vue'

export default {
  name: 'Bot',
  components : {
    Question
  },
  data(){
      return {
          ques: ''
      }
  },
  methods: {
      send(){
          this.ques = this.$refs.question.value
      }
  },
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
        overflow-y: scroll;
        padding: 10px;
        background: #000;
        color: #fff;
        &::-webkit-scrollbar {
            width: 2px; /* width of the entire scrollbar */
        }   
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