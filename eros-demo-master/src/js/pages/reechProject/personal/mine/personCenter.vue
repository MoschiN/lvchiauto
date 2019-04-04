<template>
    <div class="wrapper">
        <scroller class="main-list" offset-accuracy="300px">
            <header-person :personnfo="personinfo" :num="total"></header-person>
            <div class="cell-one" v-for="w in datalist">
              <personCenterCell :model="w"></personCenterCell>
            </div>
        </scroller>
    </div>
</template>

<script>
    import header from './personCenterHeader';
    import cell from './personCenterCell';
    import paramDao from '../../paramDao'

    export default {
        components: {'header-person': header,'personCenterCell':cell},
        created(){
            this.$router.getParams().then(resData => {
                this.personinfo = resData.info
            })
            this.mineShareRequest(0,10)
        },
        data:{
            personinfo:null,
            datalist:null,
            total:null,
            personlist:[
                {
                    name: '积分商城',
                    headImage: 'bmlocal://assets/Mine/personHeadImage.png',
                    content:'阿斯顿发送到发送到发送到发送到发送打发斯蒂芬阿斯顿发斯蒂芬',
                    bg1:"bmlocal://assets/Mine/PCbg1.png",
                    bg2:"bmlocal://assets/Mine/PCbg2.png",
                    bg3:"bmlocal://assets/Mine/PCbg3.png",
                    time:"21"
                },
                {name: '购车订单', headImage: 'bmlocal://assets/Mine/buyCar.png', content:'阿斯顿发送到发送到发送到发送到发送打发斯蒂芬阿斯顿发斯蒂芬',
                    bg1:"bmlocal://assets/Mine/PCbg1.png",
                    bg2:"bmlocal://assets/Mine/PCbg2.png",
                    bg3:"bmlocal://assets/Mine/PCbg3.png",
                    time:"21"
                },
                {
                    name: '意见反馈',
                    headImage: 'bmlocal://assets/Mine/suggestion.png',
                    content:'阿斯顿发送到发送到发送到发送到发送打发斯蒂芬阿斯顿发斯蒂芬',
                    bg1:"bmlocal://assets/Mine/PCbg1.png",
                    bg2:"bmlocal://assets/Mine/PCbg2.png",
                    bg3:"bmlocal://assets/Mine/PCbg3.png",
                    time:"21"
                },
                {
                    name: '设置',
                    headImage: 'bmlocal://assets/Mine/setting.png',
                    content:'阿斯顿发送到发送到发送到发送到发送打发斯蒂芬阿斯顿发斯蒂芬',
                    bg1:"bmlocal://assets/Mine/PCbg1.png",
                    bg2:"bmlocal://assets/Mine/PCbg2.png",
                    bg3:"bmlocal://assets/Mine/PCbg3.png",
                    time:"21"
                }
            ]
        },
        methods:{
            mineShareRequest(start,page){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                paramMap.set('userId',loginInfo.data.userInfo.userId)
                paramMap.set('start',start)
                paramMap.set('pageNum',page)
                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'MINESHARE', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    // this.$notice.toast({
                    //     message:resData.data.context
                    // })
                    this.total = Number.parseInt(resData.data.total)
                    this.$event.emit('total',resData.data.total)
                    this.datalist= resData.data.context
                    console.log(resData)
                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    console.log(error)
                })
            },
        }

    }
</script>

<style scoped>

</style>
