<template>
    <div class="wrapper">
        <div class="nav" style="margin-top: 0px; height: 88px;align-items: center;flex-direction: row">
            <image class="messageImg" resize="cover" src="bmlocal://assets/Mine/message.png" style="margin-left: 673px;width:52px;height: 52px" @click="messageAciton()"></image>
            <image  v-if="noreadNum !== 0" class="red" resize="cover" src="bmlocal://assets/Mine/red.png" style="margin-top:-25px;margin-left:-10px;width: 12px;height: 12px"></image>
        </div>
        <scroller class="main-list" offset-accuracy="300px">
            <!--"name","image","integral",-->
            <!--'fansNum','focusNum','releaseNum','isSign-->

            <header-custom :name="info.realName" :image="info.imgUrl" :info="info"></header-custom>
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
    import paramDao from '../paramDao'
    import apis from '../../../config/apis'

    export default {
        props: ["info"],

        components: {WxcCell, ErosHeader, 'header-custom': header,'cell-custom':cell},
        created(){
            // console.log('个人信息'),
            // this.$notice.toast({
            //     message:'个人信息'
            // })
            // 个人信息接口
            this.infoRequest()
            //消息个数
            this.messageNum()
        },
        data(){
            return{
                info:null,
                noreadNum:0,
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
            }
        },
        methods:{
            messageAciton() {
                this.$router.open({
                    name:'messageCenter',
                    params: {noreadCount:this.noreadNum}
                })
            },

            infoRequest(){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                // paramMap.set('mobileNum','asdfasd')
                this.$fetch({

                    method: 'POST',    // 大写
                    url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    // name: 'USERINFO', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    // this.$notice.toast({
                    //     message:resData.data.context.realName
                    // })

                    this.info= resData.data.context
                    console.log(resData)
                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    console.log(error)
                })
            },
            messageNum(){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                paramMap.set('userId',loginInfo.data.userInfo.userId)

                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'NOREAD', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {

                    this.noreadNum = resData.data.context
                    // this.$notice.toast({
                    //     message: resData.
                    // })
                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    // console.log(error)
                })

            }
        },




    }
</script>
<style lang="sass" src="./index.scss"></style>
