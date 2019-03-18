<template>
    <div class="view">
        <div class="nav">
            <image class="back" resize="cover" src="bmlocal://assets/back.png" @click="backAction()"></image>
            <div class="titleView" style="margin-left: 66px;margin-right: 0px;align-items: center; height:auto;flex:1;">
                <text style="margin-top: 0px;font-size:36px;color:white">{{title}}</text>
            </div>

            <div style="justify-content: center;margin-left: 0px;width: 150px;" >
            <text class="rightBtn"  v-if="isShowRightBtn == false" style="font-size:32px;color:#272C39;">暂无</text>
            <text class="rightBtn"  v-else :style="{fontSize:textFont,color:textColor}">{{rightText}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['title','isShowRightBtn','rightText','textColor','textFont'],
        created(){
            if(!this.textColor){
               this.textColor = '#43CBA8'
            }
            if(!this.textFont){
                this.textFont = 32
            }
        },
        methods:{
            backAction(){
                this.$router.back()
            }
        },
        data(){
            return{


            }

        }

    }
</script>

<style scoped>
    .view{
        background-color:#272C39;
        margin-top: 0px;
        height: 128px;
    }

    .nav{
        background-color:#272C39;
        margin-top: 40px;
        height: 88px;
        align-items: center;
        flex-direction: row;
    }
    .back{
        margin-left: 18px;
        width: 66px;
        height: 66px;
    }
    .rightBtn{
        margin-left:0px;
        margin-right: 0px;
        text-align: center;

    }

</style>
