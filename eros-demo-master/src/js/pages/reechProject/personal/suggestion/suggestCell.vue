<template>
    <div class="wrapper">
        <div class="view" @click="jumpDetail(model)">
            <div class="questionView">
                <text class="text" style="margin-left:19px;margin-top: 35px ">{{model.question}}</text>
                <text class="time" style="margin-top: 34px;margin-left:430px">{{model.questionTime}}</text>
            </div>
            <div class="line" style="height:2px;margin-left: 0px;margin-right: 0px;background-color:#1A2131"></div>
            <div class="answerView">
                <text class="text" style="margin-left:19px;margin-top: 35px ">{{model.answer}}</text>
                <text class="time" style="margin-top: 34px;margin-left:430px">{{model.answerTime}}</text>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ["model"],
        methods:{
            jumpDetail(model){
                this.$router.open({
                    name:'suggestDetail',
                    params: this.model
                })
            }
        }

    }
</script>

<style scoped>
    .wrapper{
        background-color: #272C39;
    }
    .view{
        margin-left: 36px;
        /*height: 349px;*/
        margin-right: 36px;
        margin-top: 30px;
        background-color: #2B303F;
        border-radius: 5px;
    }
     .text{
         font-size: 28px;
         color: white;
         lines:2;
     }
    .time{
        font-size: 22px;
        color: #9BA3B2;
        margin-bottom: 15px;
    }



</style>
