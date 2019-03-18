<template>
    <div class="wrapper">
        <scroller class="main-scroller" offset-accuracy="300px">
            <image class="backIg"
                   src="bmlocal://assets/back_icon@2x.png"
                   style="text-align: center"
                    @click="back"
            ></image>

            <text class="i-sms">请输入短信验证码</text>
            <div style="flex-direction: row">
                <input type="number" placeholder=""
                           class="textField" :autofocus="true"
                           v-model="eventOne" maxlength="1"/>
                <input type="number" placeholder=""
                       class="textField" :autofocus="false"
                       v-model="eventTwo" maxlength="1"/>
                <input type="number" placeholder=""
                       class="textField" :autofocus="false"
                       v-model="eventThree" maxlength="1"/>
                <input type="number" placeholder=""
                       class="textField" :autofocus="false"
                       v-model="eventFour" maxlength="1"/>

            </div>
            <text class="timeClick" @click="countDown">{{contentDetails}}</text>
            <!--<wxc-button class="timeClick"-->
                        <!--type="#9BA3B2"-->
                        <!--text= "content"-->
                        <!--@click="countDown"></wxc-button>-->
            <!--<button class="timeClick" @click="countDown"-->
            <!--style="color: #1da1f2" type="#272C39">-->
            <!--</button>-->
            <!--<wxc-button text=""-->
                        <!--style="margin-left: 36px;-->
                        <!--margin-top: 300px;-->
                        <!--width: 678px;-->
                        <!--height: 98px"-->
                        <!--type="#272C39"-->
                        <!--class="btnBox"-->

                        <!--@wxcButtonClicked="emit"></wxc-button>-->
            <wxc-button text='下一步'
                        style="margin-left: 36px;
                        margin-top: 300px;
                        width: 678px;
                        height: 98px"
                        type="#272C39"
                        class="btnBox"
                        @wxcButtonClicked="emit"></wxc-button>
        </scroller>
    </div>
</template>
<script>
    import { WxcButton , WxcCell } from 'weex-ui'
    const SCROLL_FULL_WIDTH = 750
    const dom = weex.requireModule('dom');

    export default {
        components: {
            WxcButton, WxcCell
        },
        created() {
            this.init()
        },
        data() {

            return {
                eventOne: '',
                eventTwo: '',
                eventThree: '',
                eventFour: '',
                contentDetails: '重新发送（60）',
                totalTime: 60,
                canClick: true
            }
        },
        mounted(){
            // this.contentDetails = this.totalTime + 's后重新发送'
            let clock = setInterval( () => {
                this.canClick = false
                this.totalTime--
                this.contentDetails = this.totalTime + 's后重新发送'
                if (this.totalTime < 0 ){
                    clearInterval(clock)
                    this.contentDetails = '重新发送验证码'
                    this.totalTime = 60
                    this.canClick = true
                }
            },1000)

        },
        methods: {
            emit () {
                this.$router.open({
                    name: 'homePage'
                })
                this.$event.emit('getParams', this.eventOne,this.eventTwo,this.eventThree,this.eventFour)
                this.$notice.toast({
                    message: '登陆成功'

                })
            },
            back() {
                this.$router.back({
                    type: 'PUSH',
                    callback(){
                        //返回成功回调
                    }
                })
            },
            countDown(){
                if (!this.canClick)return
                this.canClick = false
                this.contentDetails = this.totalTime + 's后重新发送'
                let clock = setInterval( () => {
                    this.totalTime--
                    this.contentDetails = this.totalTime + 's后重新发送'
                    if (this.totalTime < 0 ){
                        clearInterval(clock)
                        this.contentDetails = '重新发送验证码'
                        this.totalTime = 60
                        this.canClick = true
                    }
                },1000)
            }

        }
    }
</script>
<style lang="sass" src="./index.scss"></style>
