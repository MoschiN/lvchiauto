<template>
    <div class="wrapper">
        <scroller class="main-list" offset-accuracy="300px">
            <header-person></header-person>
            <div class="cell-one" v-for="w in personlist">
              <personCenterCell :model="w"></personCenterCell>
            </div>
        </scroller>
    </div>
</template>

<script>
    import header from './personCenterHeader';
    import cell from './personCenterCell';

    export default {
        props: ["headerInfo"],
        components: {'header-person': header,'personCenterCell':cell},
        data:{
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
        }
    }
</script>

<style scoped>

</style>
