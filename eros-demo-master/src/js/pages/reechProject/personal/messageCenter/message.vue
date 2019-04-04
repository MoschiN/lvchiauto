<template>
    <div class="wrapper" >

        <nav :which="read" class="navi" title="消息中心"  right-text="全部已读" :text-color="isread ? '#525969' : '#ffffff'" text-font=28></nav>
        <scroller  show-scrollbar="false" class="main-list" style="background-color: #272C39" offset-accuracy="300px">
            <div class="cell-one" v-for="i in dataList">
               <message-cell :model="i"> </message-cell>
            </div>
        </scroller>
    </div>
</template>

<script>
    import nav from '../../common/nav'
    import cell from './messageCell';
    import paramDao from '../../paramDao'
    import apis from '../../../../config/apis'

    export default {
        components: {nav,'message-cell':cell},
        created(){
            //右上角点击
            this.$event.on(this.read,params=>{
                if(!this.isread){
                    this.readAll()
                }
            })
            //未读个数传至
            this.$router.getParams().then(resData => {
                this.isread = resData.noreadCount === 0
             })

            // 消息接口
            this.messageRequest(0,10)
        },
        data:{
            dataList:null,
            read:'已读',
            isread:false
            // list:[
            //     {
            //         isRead:0,
            //         headImg: 'bmlocal://assets/Mine/personHeadImage.png',
            //         title: '张春晓',
            //         time:'2012年12月22日 13:00',
            //         content:'啊实打实大发送到发阿斯顿发送到',
            //         img:'bmlocal://assets/Mine/messageImg.png',
            //         name:'@萨德',
            //         detail:'阿萨德法师打发斯蒂芬撒旦法萨达是打发交流交流科技;离开家;了拉进来看见了看见了凉快交流交流科技了理解力科技离开',
            //         likeOrComment:',like',
            //     }]
        },

        methods:{
            messageRequest(start,pageNum){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                paramMap.set('userId',loginInfo.data.userInfo.userId)
                paramMap.set('pageNum',pageNum)
                paramMap.set('start',start)

                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'MINEMESSAGE', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    // this.$notice.toast({
                    //     message: resData.data.context
                    // }),
                    this.dataList= resData.data.context

                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    // console.log(error)
                })
            },
            readAll(){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                paramMap.set('userId',loginInfo.data.userInfo.userId)
                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'READALL', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    if(resData.code === 1000){
                        this.isread = true
                        this.$notice.toast({
                            message: this.isread,
                        })
                    }
                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    // console.log(error)
                })
            },





        }

    }
</script>

<style scoped>

</style>
