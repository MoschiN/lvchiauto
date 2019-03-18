<template>
    <div class="wrapper" style="background-color: #272C39">
        <div class="box">
            <div class="topBg" @click="back">
                <image class="i-up" src="bmlocal://assets/service/up@2x.png" style="text-align: center" ></image>
            </div>
        <div class="i-box-1">
            <image class="i-party" src="bmlocal://assets/service/party_1@2x.png" style="text-align: center" ></image>
            <text class="i-content">违章查询</text>
        </div>
        <div class="i-box-2">
            <image class="i-party-1" src="bmlocal://assets/service/party_2@2x.png" style="text-align: center" ></image>
            <text class="i-content">找代驾</text>
        </div>
        <div class="i-box-3">
            <image class="i-party-2" src="bmlocal://assets/service/party_3@2x.png" style="text-align: center" ></image>
            <text class="i-content">停车场</text>
        </div>
        <div class="i-box-4">
            <image class="i-party-3" src="bmlocal://assets/service/party_4@2x.png" style="text-align: center" ></image>
            <text class="i-content">充电桩</text>
        </div>
        </div>
    </div>
</template>
<script>


    export default {
        components: {
        },
        created() {
        },
        data() {
            return {
                block1: {
                    title: '',
                    url: '',
                    items: []
                },
            }
        },
        methods: {
            back() {
                this.$router.back({
                    type: 'PUSH',
                    callback(){
                        //返回成功回调
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .box{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 750px;
    }
    .i-party{
        position: relative;
        top: 180%;
        left: 100%;
        width: 109px;
        height: 127px;
    }
    .i-party{
        position: relative;
        top: 180%;
        left: 100%;
        width: 109px;
        height: 127px;
    }
    .i-party-1{
        position: relative;
        top: 180%;
        left: 100%;
        width: 116px;
        height: 116px;
    }
    .i-party-2{
        position: relative;
        top: 180%;
        left: 100%;
        width: 127px;
        height: 127px;
    }
    .i-party-3{
        position: relative;
        top: 180%;
        left: 100%;
        width: 117px;
        height: 116px;
    }
    .i-content{
        position: relative;
        top: 200%;
        left: 90%;
        color: #43CBA8;
        font-size: 32px;
    }
    .topBg{
        width: 750px;
        height: 120px;
        margin: 5px;
        padding: 20px;
    }
    .i-up{
        position: relative;
        top: 34px;
        left:320px;
        width: 44px;
        height: 44px;
    }
    .i-box-1{
        width: 350px;
        height: 600px;
        margin: 5px;
        padding: 20px;
        background-color: #13151B;
    }
    .i-box-2{
        width: 350px;
        height: 600px;
        margin: 5px;
        padding: 20px;
        background-color: #13151B;
    }

    .i-box-3{
        width: 350px;
        height: 600px;
        margin: 5px;
        padding: 20px;
        background-color: #13151B;
    }

    .i-box-4{
        width: 350px;
        height: 600px;
        margin: 5px;
        padding: 20px;
        background-color: #13151B;
    }


</style>

