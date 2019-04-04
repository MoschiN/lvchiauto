<template>
    <div class="header" style="background-color:#272C39">
        <div class="header-top">
            <image class="i-arrow" resize="cover" src="bmlocal://assets/Mine/mineHeaderBg.png" style="height: 400px"></image>
            <image class="backBtn" resize="cover" src="bmlocal://assets/back.png"></image>
            <image class="rightBtn" resize="cover" src="bmlocal://assets/back.png"></image>
        </div>
        <div class="header-mid">
            <image class="headImage" resize="cover" :src="headImage"></image>
            <text style="margin-top:14px;height: 48px;font-size:34px;color: white">{{personnfo.realName}}</text>
            <div class="sexCity" style="margin-top: 6px;flex-direction:row;align-items: center;">
                <image class="headImage" resize="cover" :src="personnfo.sex === '保密' ? manImage : womanImage" style="margin-top:0px;width:24px;height:24px;"></image>
                <text style="margin-left: 6px;font-size:26px;color: #9BA3B2">{{personnfo.city}}</text>
            </div>
            <div class="likeFocusFans">
                <div class="btn1" style="flex-direction: row; margin-right: 100px;">
                   <text class="commonBtn">获赞</text>
                   <text class="likeNum" style="margin-left:12px;color: #43CBA8;font-size: 28px">00</text>
                </div>
                <div class="btn2" style="flex-direction: row;">
                    <text class="commonBtn">粉丝</text>
                    <text class="fansNum" style="margin-left:12px;color: #43CBA8;font-size: 28px">00</text>

                </div>
                <div class="btn3" style="margin-left:100px;flex-direction: row;">
                    <text class="commonBtn">关注</text>
                    <text class="fansNum" style="margin-left:12px;color: #43CBA8;font-size: 28px">00</text>
                </div>
            </div>
        </div>
        <div class="header-bottom" style="flex-direction: row;align-items: center;margin-top:37px;">
            <text style="margin-left: 36px;color: white;font-size:34px" >他的发布</text>
            <div style="flex: 1"></div>
            <text style="color: #9BA3B2;font-size:26px">{{realseNum}}条发布</text>
            <image class="arrow" resize="cover" style="margin-left: 8px;margin-right: 36px; width: 8px;height: 13px; " src="bmlocal://assets/Mine/realseArrow.png"></image>

        </div>

    </div>
</template>

<script>
    export default {
        props: ["personnfo"],
        mounted(){
            setTimeout(handler=>{
                this.$notice.toast({
                    message:this.personinfo
                })
            },1500)

            // this.$event.on('total',num=>{
            //     this.realseNum = num
            //
            // })
        },
        data(){
            return{

                name:'张春晓',
                sex:1,
                city:'北京市',
                headImage:'bmlocal://assets/Mine/personHeadImage.png',
                like:12,
                fans:3,
                focus:32,
                manImage: "bmlocal://assets/Mine/sexMan.png",
                womanImage: "",
                realseNum:0
            }
        },
    }
</script>

<style scoped>
    .backBtn{
        position: absolute;
        margin-top:56px ;
        margin-left: 32px;
        width: 68px;
        height: 68px;
    }
    .rightBtn{
        position: absolute;
        margin-top:56px ;
        margin-left: 650px;
        width: 68px;
        height: 68px;
    }
    .header-mid{
        margin-left: 34px;
        margin-right: 34px;
        height: 316px;
        margin-top: -80px;
        background-color: #2B303F;
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
    }
    .headImage{
        margin-top: -80px;
        /*margin-left: 30px;*/
        width: 160px;
        height: 160px;
        border-radius: 80px;
    }
    .sexCity{
        height: 40px;

    }
    .commonBtn{
        color: white;
        font-size:28px;
    }
    .likeFocusFans{
        margin-left:96px;
        margin-right:96px;
        margin-top:44px;
        flex-direction:row;
        height:40px;
        align-self:stretch;
        /*align-items: center;*/
        justify-content: center;

    }



</style>
