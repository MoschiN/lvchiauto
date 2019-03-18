<template>
    <div class="wrapper" style="background-color: #272C39">
        <nav class="navi" title="详情"  is-show-right-btn="false"></nav>
        <div class="questionView">
            <text class="text" style="margin-top: 66px;margin-right: 36px;margin-left: 36px">{{model.question}}</text>
            <text class="time" style="margin-top: 48px;margin-right: 36px; flex: 1;text-align:right;">{{model.questionTime}}</text>
        </div>
        <div class="line" style="height:2px;margin-left: 36px;margin-right: 36px;background-color:#1A2131"></div>
        <div class="answerView" style="float: right;">
            <text class="text" style="left:36px;margin-top: 35px;margin-right: 36px ">{{model.answer}}</text>
            <text class="time" style="margin-top: 34px;right: 36px;text-align: right;">{{model.answerTime}}</text>
        </div>

    </div>
</template>

<script>
    import nav from '../../common/nav'

    export default {
        props: ["model"],
        created(){

            this.$router.getParams().then(resData => {
               this.model = resData;
            })
        },

        components: {nav},

        methods:{


        }


    }
</script>

<style scoped>
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
