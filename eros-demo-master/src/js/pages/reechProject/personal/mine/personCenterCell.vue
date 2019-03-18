<template>
    <div class="wrapper" style="background-color:#272C39;">

        <div class="header-mid" style="flex-direction: row;align-items: center">

            <image class="headImage" resize="cover" :src="model.headImage"></image>
            <text class="name">{{model.name}}</text>
        </div>
        <text class="detailContent">{{model.content}}</text>
        <div class="pictureView">
            <image class="bg1" resize="cover" :src="model.bg1"></image>
            <image class="bg2" resize="cover" :src="model.bg2"></image>
            <image class="bg3" resize="cover" :src="model.bg3"></image>
        </div>
        <div class="bottomView" style="margin-top: 28px;flex-direction: row;align-items: center">
            <text class="text" style="margin-left: 36px">{{model.time}}分钟前 </text>
            <div style="flex: 1"></div>
            <div class="LikeView">
                <image class="LikeImage" resize="cover" :src="onlikeImg"></image>
            </div>
            <text class="text" style="margin-right:36px">{{model.time}}</text>

        </div>

    </div>
</template>

<script>
    export default {
        props: ["model"],
        data(){
            return {
                select:false,
                likeImg:'bmlocal://assets/Dynamic/like.png',
                onlikeImg:'bmlocal://assets/Dynamic/likeSelected.png'
            }
        },
    }
</script>

<style scoped>
    .headImage{
            margin-top: 38px;
            margin-left: 40px;
            width: 64px;
            height: 64px;
    }
    .name{
            margin-top: 38px;
            margin-left: 24px;
            color: white;
            font-size: 28px;
    }
    .detailContent{
        margin-top: 14px;
        margin-left: 36px;
        margin-right: 36px;
        color: white;
        font-size: 28px;
    }
    .pictureView{
        margin-top: 28px;
        background-color: #1da1f2;
        margin-left: 36px;
        margin-right: 36px;
        height: 218px;
        flex-direction: row;
    }
    .bg1{
        width: 218px;
        height: 218px;
    }
    .bg2{
        margin-left: 12px;
        width: 218px;
        height: 218px;
    }
    .bg3{
        margin-left: 12px;
        width: 218px;
        height: 218px;
    }
    .text{
        color:#9BA3B2;
        font-size:26px;
    }
    .LikeView{
        /*margin-right:12px;*/
        /*width:27px;*/
        /*height: 25px;*/
    }
    .LikeImage{
        margin-right:12px;
        width:44px;
        height: 44px;
    }

</style>
