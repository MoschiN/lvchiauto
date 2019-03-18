<template>
    <div class="wrapper">
        <div class="status-bar" style="background-color:#fafafa;" :style="{'height': statusHeight}"></div>
        <scroller class="main-list" offset-accuracy="300px">
            <header-custom></header-custom>
            <div class="cell-1" style="height:139px;background-color: #2B303F">
                <div class="cell-1-view" style="flex-direction: row;height: 137px;align-items: center">
                    <text class="title">昵称</text>
                    <text class="name" style="margin-left: 80px;color: #9BA3B2;font-size:38px ">{{name}}</text>
                </div>
                <div class="line"></div>
            </div>
            <div class="cell-2" style="height:139px;background-color: #2B303F">
                <div class="cell-1-view" style="flex-direction: row;height: 137px;align-items: center">
                    <text class="title">性别</text>
                    <image class="sex" resize="cover" :src="sex == 1 ? onSelectImg : selectImg" @click="changeBtn(sex)"></image>
                    <text class="title">男</text>
                    <image class="sex" resize="cover" :src="sex == 0 ? onSelectImg : selectImg" @click="changeBtn(sex)"></image>
                    <text class="title">女</text>
                </div>
                <div class="line"></div>
            </div>
            <div class="cell-3" style="height:139px;background-color: #2B303F">
                <div class="cell-1-view" style="flex-direction: row;height: 137px;align-items: center">
                    <text class="title">地区</text>
                    <text class="city" style="margin-left: 80px;color: #9BA3B2;font-size:38px ">{{city}}</text>
                </div>
                <div class="line"></div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcCell } from 'weex-ui'
    import header from './personInfoHeader';

    export default {

        // props: ["info"],
        components: {WxcCell,'header-custom': header},

        data(){
            return{
                name:'张春晓',
                sex:0,
                city:'北京',
                onSelectImg:'bmlocal://assets/Mine/sexSelect.png',
                selectImg:'bmlocal://assets/Mine/Select.png'
            }
        },
        methods: {
            changeBtn(sex) {
                // if (!sex) return;
                if (sex == 1) {
                    this.sex = 0;
                }  else if (sex == 0) {
                    this.sex = 1;
                }
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        background-color: #1A2131;
    }
    .line{
        margin-top: 0px;
        height: 2px;
        background-color: #1A2131;
        margin-left: 36px;
        margin-right: 36px;
    }
    .title{
       margin-left: 36px;
        color: white;
        font-size: 38px;
    }
   .sex{
       margin-left: 80px;
       width: 44px;
       height: 44px;
    }



</style>
