<template>
  <div>
    
    <div class="container">
      <d-news :token="loginInfo.data.token" v-if="curIndex===0"/>
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

const stream = weex.requireModule('stream')
export default {
  created(){
    // 安卓自定义退出 app
    this.androidFinishApp()
    this.authLoginBySms('15313659181','1234')
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
          paramMap.set('mobile',phoneNum)
          paramMap.set('code',sms)
          // stream.fetch({
          //   method: 'POST',
          //   url: 'http://10.120.8.187:9966/s-user/clientDetails/list',
          //   type:'text',
          //   body:'username=18240349328&password=123456',
          // }, function(ret) {
          //   var modal = weex.requireModule('modal')
          //   modal.toast({
          //       message: 'This is a toast',
          //       duration: 3,
          
          //   })
          // })
          this.$fetch({
              method: 'POST',    // 大写
              name:'http://10.120.8.187:9966/s-user/clientDetails/list',
              // name: 'AUTH.loginBySms', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
              data: paramDao.getParamsJSON(paramMap),
             
          }).then(resData => {
            this.$notice.toast({
                message:resData
              })
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
