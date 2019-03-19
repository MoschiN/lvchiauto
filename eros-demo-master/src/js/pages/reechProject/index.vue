<template>
  <div>
    
    <div class="container">
      <d-news :loginInfo="loginInfo" v-if="curIndex===0"/>
      <my-car v-else-if="curIndex===1"></my-car>
      <my-server v-else-if="curIndex===2"></my-server>
      <my-mine v-else></my-mine>
    </div>
    <div class="tab">
      <div class="tab-item" v-for="(tab,index) in tags" :key="index" @click="onClickTab(index)">
        <image style="width:52px;height:52px;margin-bottom:4px;" :src="index===curIndex?tab.activeIcon:tab.icon"></image>
        <text :style="{color:index===curIndex?'#43CBA8':'#9BA3B2'}">{{ tab.title}}</text>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding-top: 44px;
  flex: 1;
  background-color: #272c39;
}
.tab {
  background-color: #272c39;
  flex-direction: row;
  height: 98px;
}
.tab-item {
  padding-top: 9px;
  padding-bottom: 7px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  align-self: center;
}
</style>
<script>
import dNews from './discover/index.vue'
import myCar from './myCar/index.vue' 
import myServer from './server/index.vue'
import myMine from './personal/index.vue'
import paramDao from './paramDao'
import customAjax from './utils/customAjax'
const modal = weex.requireModule('modal')
const stream = weex.requireModule('stream')
const axios = weex.requireModule('bmAxios')

export default {
  created(){
    // 安卓自定义退出 app
    this.androidFinishApp()
    // this.authLoginBySms('15313659181','1234')
    this.authLoginByPwd('18240349328','123456')
  },
  components:{
    'd-news':dNews,
    'my-car':myCar,
    'my-server':myServer,
    'my-mine':myMine,
  },
  methods:{
      onClickTab(index){
           this.curIndex=index;
      },
      androidFinishApp () {
            const globalEvent = weex.requireModule('globalEvent')
            globalEvent.addEventListener('homeBack', options => {
              var curTime=new Date().getTime()
              if(curTime-this.preTime>2000){
                this.preTime=curTime
                this.$notice.toast({ message: `再按一次退出应用` })
              }else{
                this.$router.finish()
              }
            })
        },
        // 登录请求
        authLoginBySms(phoneNum,sms){
          var paramMap=new Map()
          paramMap.set('mobileNum',phoneNum)
          paramMap.set('smsCode',sms)
         
          this.$fetch({
              method: 'POST',    // 大写
              name: 'AUTH.loginBySms', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
              data: paramDao.getParamsJSON(paramMap)
          }).then(resData => {
              // this.$notice.toast({
              //     message:resData.data.token
              // })
            this.loginInfo=resData
            console.log(resData)
          }, error => {
              // 错误回调
              this.$notice.toast({
                message:error
              })
              console.log(error)
          })
        },
        authLoginByPwd(userName,pwd){
          var paramMap=new Map()
          paramMap.set('username',userName)
          paramMap.set('password',pwd)
      
        this.$fetch({
              method: 'POST',    // 大写
              // url:'http://10.120.8.187:7766/login/pwd',
              name: 'AUTH.loginByPwd', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
              // data: 'username=18240349328&password=123456',
              data: paramDao.getParamsJSON(paramMap),
              // header:{
              //   'Content-Type':'application/x-www-form-urlencoded'
              // }
          }).then(resData => {
              // this.$notice.toast({
              //   // "token":{
              //     // "access_token":"0a63560e-f3df-48cb-8516-17d140811306",
              //     // "refresh_token":"e4bf0f88-18bd-418b-b109-de468bfc6347",
              //     // "scope":"abc aab",
              //     // "token_type":"bearer",
              //     // "expires_in":6371}
              //     message:resData
              // })
              this.loginInfo=resData
              // 将登陆信息持久化保存到本地,供各个界面使用.
              this.$storage.setSync('loginInfo', resData)
               // 初始化推荐页
              this.$event.emit('discoveryQ',{index:0,isRefresh:0})
            console.log(resData)
          }, error => {
              // 错误回调
              this.$notice.toast({
                message:error
              })
              console.log(error)
          })
        },
        
        
  },
  data() {
    return {
      preTime:0,
      curIndex:0,
      loginInfo:null,
      tags: [
        {
          title: "发现",
          icon: "bmlocal://assets/tab_discovery.png",
          activeIcon: "bmlocal://assets/tab_discovery_down.png",
          item: "dicover"
        },
        {
          title: "爱车",
          icon: "bmlocal://assets/tab_mycar.png",
          activeIcon: "bmlocal://assets/tab_mycar_down.png",
          item: "dicover.detail"
        },
        {
          title: "服务",
          icon: "bmlocal://assets/tab_service.png",
          activeIcon: "bmlocal://assets/tab_service_down.png",
          badge: 5,
          item: "dicover"
        },
        {
          title: "我的",
          icon: "bmlocal://assets/tab_mine.png",
          activeIcon: "bmlocal://assets/tab_mine_down.png",
          dot: true,
          item: "dicover"
        }
      ],
     
    };
  }
};
</script>
