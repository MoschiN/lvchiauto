<template>
    <div class="wrapper">
        <div class="view1" style="flex-direction:row;height: 170px;align-items: center">
            <image class="i-image" resize="cover" src="bmlocal://assets/Mine/personHeadImage.png" @click="headerImageAction()"></image>
            <div class="name-integral" style="flex-direction: column;margin-left:35px">
                <div class="name" style="flex-direction:row;height: 62px;">
                    <text class="i-name">张春晓</text>
                    <image class="editimg" resize="cover" src="bmlocal://assets/Mine/editing.png" @click="editAction(name)">
                    </image>
                </div>
                <div class="integral" style="flex-direction:row;align-items:center;margin-top:18px;height:40px;" >
                    <image class="integralimg" resize="cover" src="bmlocal://assets/Mine/integralImg.png" style="margin-left: 0px;width:26px;height: 26px"></image>
                    <text class="integral">1600积分</text>
                    <image class="integral-arrow" resize="cover" src="bmlocal://assets/Mine/integral-arrow.png"></image>
                </div>
            </div>
            <div class="sign" style=" margin-left:120px;width:180px;height:76px">
                <text class="i-name" style="padding-left: 60px;color: #43CBA8;font-size: 34px">签到</text>
            </div>
        </div>
        <div class="view2" style="flex-direction: row;height:220px;align-items: center">
            <div class="btn1" style="margin-left: 110px;background-color: #b4282d">
                <text class="releaseNum" style="color: #43CBA8;font-size: 34px">16</text>
                <text class="commonBtn">发布</text>
            </div>
            <div class="btn2" style="margin-left:127px;background-color: #d1f287">
                <text class="fansNum" style="color: #43CBA8;font-size: 34px">16</text>
                <text class="commonBtn">粉丝</text>
            </div>
            <div class="btn3" style="margin-left:127px;background-color: #d1f287">
                <text class="focusNum" style="color: #43CBA8;font-size: 34px">16</text>
                <text class="commonBtn">关注</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["name","image","integral",
            'fansNum','focusNum','releaseNum','isSign'],
        methods: {
            editAction(string) {
                this.$router.open({
                    name:'pushInfoVC'
                    // params: {name:this.string}
                })
                // console.log(this.string);
            },
            headerImageAction(){
                this.$router.open({
                    name:'personCenter'
                })
                // params: {name:this.string}
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        margin-top:20px;
        margin-left: 36px;
        margin-right: 36px;
        margin-bottom: 20px;
        height: 395px;
        background-color: #383F4F;
        border-radius: 10px;
    }
    .i-image{
        margin-left: 38px;
        width: 120px;
        height: 120px;
    }
    .i-name{
        margin-top:15px;
        font-size:34px;
        color: #9BA3B2;
    }
    .integral{
        margin-left: 9px;
        font-size:28px;
        color: #43CBA8;
    }
    .integral-arrow{
        margin-left: 10px;
        width: 10px;
        height: 12px;

    }
    .editimg{
        margin-top:24px;
        margin-left:10px;
        width: 25px;
        height: 25px;
     }
    .sign{
        border-bottom-width: 2px;
        border-top-width: 2px;
        border-left-width: 2px;
        border-color: #43CBA8;
        border-bottom-left-radius: 39px;
        border-top-left-radius: 39px;
    }
    .commonBtn{
        font-size: 34px;
        color: white;
    }
</style>
