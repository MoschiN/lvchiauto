<template>
    <div class="wrapper" style="background-color: #272C39">
        <nav class="navi" title="消息中心" right-text="全部已读" text-color="#ffffff" text-font=28></nav>
        <scroller class="main-list" offset-accuracy="300px">
            <div class="cell-one" v-for="i in list">
               <message-cell :model="i"> </message-cell>
            </div>
        </scroller>
    </div>
</template>

<script>
    import nav from '../../common/nav'
    import cell from './messageCell';

    export default {
        components: {nav,'message-cell':cell},

        data:{
            list:[
                {
                    isRead:0,
                    headImg: 'bmlocal://assets/Mine/personHeadImage.png',
                    title: '张春晓',
                    time:'2012年12月22日 13:00',
                    content:'啊实打实大发送到发阿斯顿发送到',
                    img:'bmlocal://assets/Mine/messageImg.png',
                    name:'@萨德',
                    detail:'阿萨德法师打发斯蒂芬撒旦法萨达是打发交流交流科技;离开家;了拉进来看见了看见了凉快交流交流科技了理解力科技离开',
                    likeOrComment:',like',
                }]
        }
    }
</script>

<style scoped>

</style>
