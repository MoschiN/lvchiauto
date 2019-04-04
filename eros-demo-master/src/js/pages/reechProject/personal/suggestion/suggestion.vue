<template>
    <div class="wrapper" style="background-color: #272C39">
        <nav class="navi" title="意见反馈" is-show-right-btn='false'></nav>
        <scroller class="main-list" offset-accuracy="300px" style="margin-bottom: 0px">
            <div class="cell-one" v-for="w in dataList">
                <suggest-cell :model='w'></suggest-cell>
            </div>

        </scroller>
        <div class="writeBtn" @click="writeAction()">
            <text class="text" style="text-align: center;font-size: 38px;color: white">我要写几句</text>
        </div>
    </div>
</template>

<script>
    var modal = weex.requireModule('bmModal')

    import { WxcCell } from 'weex-ui'
    import cell from './suggestCell';
    import Bui from "../../../demo/other/bui";
    import nav from '../../common/nav'
    import paramDao from '../../paramDao'

    export default {
        // props: ["info"],
        components: {Bui, WxcCell, 'suggest-cell':cell,nav},
        created(){
            // 消息接口
            this.suggestRequest(0,10)
        },
        data:{
            dataList:null,
            list:[
                {
                    question: '问:啊实打实大发送到阿斯顿发送到发',
                    answer: '答：感谢您的意见反馈，我们已把该情况转告',
                    answerTime: '2018年08月23日 15:00',
                    questionTime:'2012年12月22日 13:00'
                },
                {
                    question: '问:啊实打实大发送到阿斯顿发送到发啊实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送啊实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送啊实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送',
                    answer: '答：感谢您的意见反馈，我们已把该情况转告感谢您的意见反馈，我们已把该情况转告感谢您该情况转告',
                    answerTime: '2018年08月23日 15:00',
                    questionTime:'2012年12月22日 13:00'
                },
                {
                    question: '问:啊实打实大发送到阿斯顿发送到发',
                    answer: '答：感谢您的意见反馈，我们已把该情况转告',
                    answerTime: '2018年08月23日 15:00',
                    questionTime:'2012年12月22日 13:00'
                },
                {
                    question: '问:啊实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送到发实打实大发送到阿斯顿发送到发',
                    answer: '答：感谢您的意见反馈，我们已把该情况转告',
                    answerTime: '2012年12月22日 13:00',
                    questionTime:'2012年12月22日 13:00'
                }
            ]
        },

        methods: {
            writeAction() {
                this.$router.open({
                    name: 'pushWriteSuggest'
                })
            },
            suggestRequest(start, pageNum) {
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap = new Map()
                paramMap.set('userId', loginInfo.data.userInfo.userId)
                paramMap.set('pageNum', pageNum)
                paramMap.set('start', start)

                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'SUGGESTList', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header: {
                        'Authorization': 'Bearer  ' + loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    // this.$notice.toast({
                    //     message: resData
                    // }),
                        this.dataList = resData.data.context

                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message: error
                    })
                    // console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .writeBtn{
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        height: 98px;
        background-color: #43CBA8;
        justify-content: center;

    }

</style>
