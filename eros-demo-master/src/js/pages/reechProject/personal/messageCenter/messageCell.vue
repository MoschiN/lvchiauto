<template>
    <div class="wrapper" style="background-color: #2B303F">
        <div class="titleImg" style="flex-direction: row;height: 120px;background-color: #2B303F">
            <image class="header" resize="cover" src='bmlocal://assets/Mine/personHeadImage.png'></image>
            <div v-if="model.isRead== 0">
               <image class="red" resize="cover" src='bmlocal://assets/Mine/red.png'></image>
            </div>
            <div >
                <text class="title" style="margin-left:26px;margin-top: 21px ">{{model.title}}</text>
                <text class="time" style="margin-top: 4px;margin-left:26px">{{model.time}}</text>
            </div>
        </div>
        <div v-if="model.likeOrComment == 'like'">
            <text  class="content" style="margin-left:36px;margin-right:36px;margin-top:0px;margin-bottom: 16px;font-size:28px;color:white">点赞了此条</text>
        </div>
        <div v-else>
            <text  class="content" style="margin-left:36px;margin-right:36px;margin-top:0px;margin-bottom: 16px;font-size:28px;color:white">{{model.content}}</text>
        </div>

        <div style="background-color:#272C39;height: 203px;width:750px;flex-direction:row;align-items: center;">

            <image v-if="model.img != ''" class="messageImg" resize="cover" :src='model.img'></image>
            <div style="margin-left:40px;height: 150px;margin-right: 36px;flex: 1;">
                <text class="name" style="margin-left:0px;margin-top:0px">{{model.name}}</text>
                <div class="detail" style="height: 114px;align-items: center;justify-content: center">

                  <text class="text-wrapper">{{model.detail}}</text>

                </div>
            </div>
        </div>
        <div style="background-color:#2B303F;height: 14px "></div>

    </div>
</template>

<script>

    export default {
        props: ["model"],
        name: "messageCell",
    }
</script>

<style scoped>
    .wrapper{
        margin-top: 23px;
    }
    .header{
        margin-top: 21px;
        margin-left:36px;
        width: 64px;
        height: 64px;
    }
    .red{
        margin-top: 25px;
        margin-left:-17px;
        width: 12px;
        height: 12px;
    }

    .title{
        font-size: 28px;
        color:white;
    }
    .time{
        color: #9BA3B2;
        font-size: 22px;
    }
    .messageImg{
        margin-left: 36px;
        width:138px;
        height: 138px;
    }
    .name{
        color: #FFFFFF;
        font-size: 28px;
    }
    .text-wrapper{
        /*position: absolute;*/
        /*width: 500px;*/
        /*background-color: #1f34b4;*/
        color: #FFFFFF;
        font-size: 28px;
        lines:3;
    }


</style>
