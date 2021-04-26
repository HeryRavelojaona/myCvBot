<template>
    <div id="question">
        <div class="test" v-for="aQuestion, index in questions" :key="index">
            <p class="question">{{ aQuestion }}</p>
            <p class="answer" v-if="response[index]">{{ response[index] }}</p>
            <p class="answer" v-else>Pas de réponse</p>

        </div>
    
    </div>
</template>

<script>
export default {
    name : 'Question',
    props: {
        question: ''
    },
    data(){
        return {
            questions: [],
            response: ["mon nom es Hery", "J'ai 37 ans"],
            answer :'',
            res: []
        }
    },
    computed:{
        questionArray(){
            this.questions.push(this.question)
        }
    }
}
</script>

<style lang="scss" scoped>
#question {
    p.question  {
        background-color: #ccc;
        border-radius: 3px;
        color: #000;
        width: 80%;
        padding: 10px 5px; 
        margin: 0 0 15px 18%;
    }
    p.answer {
        background-color: #fff;
        border-radius: 3px;
        color: #000;
        width: 80%;
        padding: 10px 5px; 
        margin: 0 0 15px 0%;
    }
}
</style>