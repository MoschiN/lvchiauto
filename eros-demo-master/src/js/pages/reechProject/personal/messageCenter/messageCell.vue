<template>
    <div class="wrapper" style="background-color: #2B303F" @click="CELLACTION">
        <div class="titleImg" style="flex-direction: row;height: 120px;background-color: #2B303F">
            <div v-if="model.noticeType == 'likes'">
                <image class="header" resize="cover" :src="typeof model.newsShareLikes.likesUserHeadPortraitUrl ==='undefined' || model.newsShareLikes.likesUserHeadPortraitUr ==='null'||model.newsShareLikes.likesUserHeadPortraitUr == null ? 'bmlocal://assets/Mine/personHeadImage.png' : model.newsShareLikes.likesUserHeadPortraitUr"> </image>
            </div>
            <div v-else>
                <image class="header" resize="cover" :src="typeof model.comment.commentUserHeadPortraitUrl ==='undefined' || model.comment.commentUserHeadPortraitUrl ==='null'||model.comment.commentUserHeadPortraitUrl == null ? 'bmlocal://assets/Mine/personHeadImage.png' : model.comment.commentUserHeadPortraitUrl"></image>
            </div>
            <div v-if="!ishide">
               <image class="red" resize="cover" src='bmlocal://assets/Mine/red.png'></image>
            </div>
            <div v-else>

            </div>
            <div v-if="model.noticeType == 'likes'">
                <text class="title" style="margin-left:26px;margin-top: 21px ">{{model.newsShareLikes.likesUserNickName}}</text>
                <text class="time" style="margin-top: 4px;margin-left:26px">{{model.newsShareLikes.likesTime}}</text>
            </div>
            <div v-else>
                <text class="title" style="margin-left:26px;margin-top: 21px ">{{model.comment.commentUserNickName}}</text>
                <text class="time" style="margin-top: 4px;margin-left:26px">{{model.comment.createTime}}</text>
            </div>
        </div>
        <div v-if="model.noticeType == 'likes'">
            <text  class="content" style="margin-left:36px;margin-right:36px;margin-top:0px;margin-bottom: 16px;font-size:28px;color:white">赞了这条评论</text>
        </div>
        <div v-else>
            <text  class="content" style="margin-left:36px;margin-right:36px;margin-top:0px;margin-bottom: 16px;font-size:28px;color:white">{{model.comment.commentContext}}</text>
        </div>

        <div style="background-color:#272C39;height: 203px;width:750px;flex-direction:row;align-items: center;">

            <image v-if="model.newsShare.imagesUrl.split(',')[0] !== '' || typeof model.newsShare.imagesUrl.split(',')[0] !=='undefined' ||  model.newsShare.imagesUrl.split(',')[0] !=='null' ||model.newsShare.imagesUrl.split(',')[0] !== null " class="messageImg" resize="cover" :src="model.newsShare.imagesUrl.split(',')[0]"></image>
            <div style="margin-left:40px;height: 150px;margin-right: 36px;flex: 1;">
                <text class="name" style="margin-left:0px;margin-top:0px">{{model.newsShare.pushUserNick}}</text>
                <div class="detail" style="height: 114px;align-items: flex-start;justify-content: center">

                  <text class="text-wrapper">{{model.newsShare.title}}</text>

                </div>
            </div>
        </div>
        <div style="background-color:#2B303F;height: 14px "></div>

    </div>
</template>

<script>
    import paramDao from '../../paramDao'
    export default {
        props: ["model"],
        name: "messageCell",
        data:{
            ishide:false  //显示红点

        },
        created(){

           this.ishide = this.model.isRead === 'Y'
        },

        methods:{
            CELLACTION(){
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap=new Map()
                paramMap.set('userId',loginInfo.data.userInfo.userId)
                paramMap.set('noticeId',this.model.id)

                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'READ', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header:{
                        'Authorization':'Bearer  '+loginInfo.data.token.access_token
                    }

                }).then(resData => {

                    if(resData.code ===  1000){
                        this.ishide = true;
                        this.$notice.toast({
                            message: '已读'
                        })
                    }

                }, error => {
                    // 错误回调
                    this.$notice.toast({
                        message:error
                    })
                    // console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        margin-top: 23px;
    }
    .header{
        margin-top: 21px;
        margin-left:36px;
        width: 64px;
        height: 64px;
    }
    .red{
        margin-top: 25px;
        margin-left:-17px;
        width: 12px;
        height: 12px;
    }

    .title{
        font-size: 28px;
        color:white;
    }
    .time{
        color: #9BA3B2;
        font-size: 22px;
    }
    .messageImg{
        margin-left: 36px;
        width:138px;
        height: 138px;
    }
    .name{
        color: #FFFFFF;
        font-size: 28px;
    }
    .text-wrapper{
        /*position: absolute;*/
        /*width: 500px;*/
        /*background-color: #1f34b4;*/
        color: #FFFFFF;
        font-size: 28px;
        lines:3;
    }


</style>
