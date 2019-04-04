<template xmlns="http://www.w3.org/1999/html">
    <div class="wrapper" @click="jumpWeb(name)">
            <image class="i-image" resize="cover" :src="image"></image>
              <div v-if="name == '积分商城'">
                <text class="i-name-green">{{name}}</text>
              </div>
             <div v-else>
                 <text class="i-name">{{name}}</text>
              </div>
            <image class="i-arrow" resize="cover" :src="arrow"></image>
    </div>
</template>

<script>
    var modal = weex.requireModule('bmModal')

    export default {
        props: ["name","image","arrow"],
        methods: {
            jumpWeb(nameStr) {

                if (nameStr == '积分商城' || nameStr == '购车订单') {
                    modal.toast({
                        message: '暂未开放'
                    })
                }
                else if (nameStr == '意见反馈') {
                    this.$router.open({
                        name:'suggest'
                    })
                }
                else {
                    this.$router.open({
                        name:'jump'
                    })
                }
            }
        }

    }
</script>

<style scoped>
   .wrapper{
       height: 118px;
       flex-direction: row;
       /*position: absolute;*/
       align-items: center;
   }

    .i-image{

        margin-left: 61px;
        width: 26px;
        height: 26px;
    }
    .i-name{

        margin-left: 12px;
        width: 140px;
        color: #9BA3B2;
        font-size: 34px;
    }
   .i-name-green{
       margin-left: 12px;
       width: 140px;
       color: #43CBA8;
       font-size: 34px;
   }
    .i-arrow{
        margin-left: 435px;
        width: 16px;
        height: 19px;
    }


</style>
