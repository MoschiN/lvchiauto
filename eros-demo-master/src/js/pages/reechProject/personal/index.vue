<template>
    <div class="wrapper">
        <div class="status-bar" style="background-color:#fafafa;" :style="{'height': statusHeight}"></div>
        <div class="nav" style="margin-top: 40px; height: 88px;align-items: center;flex-direction: row">
            <image class="messageImg" resize="cover" src="bmlocal://assets/Mine/message.png" style="margin-left: 673px;width:52px;height: 52px" @click="messageAciton()"></image>
            <image class="red" resize="cover" src="bmlocal://assets/Mine/red.png" style="margin-top:-25px;margin-left:-10px;width: 12px;height: 12px"></image>
        </div>
        <scroller class="main-list" offset-accuracy="300px">
            <header-custom></header-custom>
            <div class="cell-one" v-for="(w,index) in personlist" :key="index">
                <cell-custom :name="w.name" :image="w.img" :arrow="w.arrow"></cell-custom>
                <div class="line"></div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcCell } from 'weex-ui'
    import ErosHeader from '../common/header'
    import header from './personHead';
    import cell from './personCell';

    export default {
        props: ["info"],
        components: {WxcCell, ErosHeader, 'header-custom': header,'cell-custom':cell},
        data:{
                personlist:[
                    {
                        name: '积分商城',
                        img: 'bmlocal://assets/Mine/intergal.png',
                        arrow: 'bmlocal://assets/Mine/arrow-green.png'
                    },
                    {name: '购车订单', img: 'bmlocal://assets/Mine/buyCar.png', arrow: 'bmlocal://assets/Mine/arrow.png'},
                    {
                        name: '意见反馈',
                        img: 'bmlocal://assets/Mine/suggestion.png',
                        arrow: 'bmlocal://assets/Mine/arrow.png'
                    },
                    {name: '设置', img: 'bmlocal://assets/Mine/setting.png', arrow: 'bmlocal://assets/Mine/arrow.png'}
                ]
        },
        methods:{
            messageAciton() {
                this.$router.open({
                    name:'messageCenter'
                })
            }
        }
    }
</script>
<style lang="sass" src="./index.scss"></style>
