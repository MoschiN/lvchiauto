<template>
    <div class="wrapper">
        <div class="status-bar" style="background-color:#ffffff;" :style="{'height': statusHeight}"></div>
        <scroller class="main-list" offset-accuracy="300px">
            <div class="cell-one" v-for="w in settinglist">
                <div v-if="w.name == '版本'"  class="cell">
                    <text class="i-name">{{w.name}}</text>
                    <text class="i-version">{{w.version}}</text>
                </div>
                <div v-else class="cell" @click="out()">
                    <text class="i-name">{{w.name}}</text>
                    <!--<image class="i-arrow" resize="cover" :src="arrow"></image>-->
                </div>
                <div class="line"></div>
                <!--<div v-if="w.isShow" class="line"></div>-->
            </div>
        </scroller>
    </div>
</template>

<script>
    var modal = weex.requireModule('bmModal')



    export default {

        name: "set",
        data(){
            return{
                settinglist:[
                    {
                        name: '版本',
                        img: 'bmlocal://assets/Mine/intergal.png',
                        arrow: 'bmlocal://assets/Mine/arrow-green.png',
                        version:'v1.0.0',
                        isShow:true
                    },
                    {name: '退出登录', img: 'bmlocal://assets/Mine/buyCar.png', arrow: 'bmlocal://assets/Mine/arrow.png',version:'',isShow:false}
                ]
            }
        },

        methods: {
            out(){
                modal.confirm({
                    message: '您确定退出登录吗?',       // 弹窗内容
                    cancelTitle: '取消',          // 取消按钮文字
                    okTitle: '确定'  ,             // 确定按钮文字
                }, function(){
                    // 点击取消按钮回调
                }, function(){
                    // 点击确定按钮回调
                })
            }
        }
    }
</script>

<style scoped>
       .wrapper{
           background-color: #272C39;
       }
       .main-list{
           background-color: #272C39;
           margin-top: 0px;
       }
    .cell-one{
        height: 105px;
        /*background-color: #b4282d;*/
    }
    .cell{
        /*align-items: center;*/
        flex-direction: row;
    }
     .i-name{
         margin-top: 28px;
         margin-left: 60px;
         color: #9BA3B2;
         font-size: 34px;
     }
     .i-version{
         margin-top: 28px;
         margin-left: 467px;
         color: #9BA3B2;
         font-size: 28px;
     }
       .line{
           margin-top: 28px;
           height: 2px;
           background-color: #1A2131;
           margin-left: 36px;
           margin-right: 36px;
       }
</style>
