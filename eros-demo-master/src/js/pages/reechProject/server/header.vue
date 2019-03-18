<template>
<div class="wrapper" style="background-color: #272C39">
<div class="topContent">
    <image class="i-location" src="bmlocal://assets/service/location@2x.png" style="text-align: center" ></image>
    <text class="i-address">北京</text>
    <body style="flex-direction: row">
    <text class="i-content">您的附近有</text>
    <text class="i-num">20</text>
    <text class="i-content">辆车正在待命</text>
    </body>
</div>
<div class="i-box" >
    <image class="i-bgImg" src="bmlocal://assets/service/travel.gif" style="text-align: center" ></image>
</div>
<div class="i-btn-Action" @click="go">
    <text class="i-action">立刻用车</text>
    <image class="i-shape" src="bmlocal://assets/service/Shape@2x.png" style="top:90px" ></image>
</div>



</div>
</template>

<script>
    export default {
        name: "header",
        props: ["address"],
        methods:{
            go() {
                this.$router.open({
                    name: 'serviceList'
                })
            }
        }
    }
</script>

<style scoped>
    .i-shape{
        position: relative;
        left:320px;
        width: 44px;
        height: 44px;
    }
    .i-action{
        position: relative;
        font-size: 34px;
        color: #43CBA8;
        width: 460px;
        height: 98px;
        margin-top: 50px;
        margin-left: 125px;
        padding: 10px;
        line-height: 64px;
        text-align: center;
        border-width: 2px;
        border-color: #43CBA8;
        border-radius: 46px;
    }
    .i-btn-Action{
        position: relative;
        width: 750px;
        height: 400px;
        margin: 5px;
        padding: 20px;
        text-align: center;
       margin-top: 125px;
        /*background-color: #1da1f2;*/
        /*flex-direction: row;*/
    }
    .i-bgImg{
        position: relative;
        top: 0px;
        width: 506px;
        height: 506px;
    }
    .i-content{
        position: relative;
        left: 145px;
        top: 60px;
        color: #b9b9b9;
        font-size: 26px;
    }
    .i-num{
        position: relative;
        top: 60px;
        left: 145px;
        color: #43CBA8;
        font-size: 26px;
    }
.topContent{
    width: 750px;
    height: 100px;
    margin: 5px;
    padding: 20px;
    text-align: center;
    flex-direction: row;
    /*background-color: #1da1f2;*/
}
.i-location{
    position: relative;
    left:300px;
    width: 44px;
    height: 44px;
}
.i-address{
    position: absolute;
    left: 370px;
    top: 25px;
    color: #b9b9b9;
    font-size: 26px;
}
    .i-box{
        position: relative;
        width: 506px;
        height: 506px;
        margin: 5px;
        padding: 0px;
        /*background-color: #1da1f2;*/
        top: 50%;
        left: 50%;
        margin-left: 100px;
        /*margin-top: 10px;*/

    }

</style>
