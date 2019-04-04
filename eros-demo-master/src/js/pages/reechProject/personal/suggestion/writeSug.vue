<template>
    <div class="wrapper" style="background-color: #272C39">
        <nav :which="commit" class="navi" title="意见反馈" right-text="提交" is-show-right-btn="true"></nav>
        <textarea class="textfeild" @input="oninput" placeholder="请告诉我们您在使用App时遇到了什么问题?" maxlength="200">

        </textarea>
    </div>

</template>

<script>
    import nav from '../../common/nav'
    import paramDao from '../../paramDao'

    export default {
        components: {nav},
        data() {
            return {
                commit:'提交',
                inputText:null
            }
        },
        name: "writeSug",
        created() {

            //右上角点击
            this.$event.on(this.commit, params => {
                if(this.inputText){
                    this.addSuggestRequest(this.inputText)
                } else {
                    this.$notice.toast({
                        message: '无提交内容'
                    })

                }
            })
        },

        methods:{
            oninput (event) {
                this.inputText = event.value
            },
            addSuggestRequest(text) {
                var loginInfo = this.$storage.getSync('loginInfo')
                var paramMap = new Map()
                paramMap.set('userId', loginInfo.data.userInfo.userId)
                paramMap.set('question', text)

                this.$fetch({

                    method: 'POST',    // 大写
                    // url:paramDao.getBaseUrl(2)+apis.USERINFO,
                    name: 'addQuestion', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    // data: 'username=18240349328&password=123456',
                    data: paramDao.getParamsJSON(paramMap),
                    header: {
                        'Authorization': 'Bearer  ' + loginInfo.data.token.access_token
                    }

                }).then(resData => {
                    if(resData.code === 1000){
                        this.$notice.toast({
                            message: '提交成功'
                        })
                        setTimeout(handler=>{
                            this.$router.back();
                        },1500)

                    }
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
    .textfeild{
        color: #9BA3B2;
        /*background-color: #b4282d;*/
        margin-left:36px;
        margin-right: 36px;
        margin-top: 30px;
        height: 450px;
    }
</style>
