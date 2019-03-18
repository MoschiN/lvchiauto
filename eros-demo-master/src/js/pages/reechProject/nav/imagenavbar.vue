<template>
    <div :style="{width:imgWidth,height:imgHeight,}">
        <image :src="backgroundImage" :style="{width:imgWidth,height:imgHeight,}"></image>
        <div class="navBar" :style="{marginTop:statusHeight,postion:'relative',top:-imgHeight,}">
            <image style="width:60px;height:60px;" src="bmlocal://assets/back_icon.png" @click="onBack"></image>
            <text style="flex:1;color:white;size:32px;text-align:center;">{{title}}</text>
            <image style="width:60px;height:60px;" src="bmlocal://assets/share_icon.png" @click="onShare"></image>
        </div>
    </div>
</template>
<style lang="sass" scoped>
    .navBar{
        height:98px;
        width:auto;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        padding-left:36px;
        padding-right:36px;
    }
</style>
<script>
var modal = weex.requireModule('modal')

export default {
    props:['title','onBackTag','backgroundImage'],
    created(){
        if(this.backgroundImage==null){
            this.backgroundImage='http://img4.duitang.com/uploads/item/201402/14/20140214120558_2f4NN.jpeg'
        }
    },
    data(){
        return{
            imgWidth:750,
            imgHeight:460,
            statusHeight: Number.parseInt(this.statusBarHeight || weex.config.env.statusBarHeight || 40),
        }
    },
    methods:{
        onBack(){
            if(this.onBackTag!=null){
                this.$event.emit(this.onBackTag)
            }else{
                this.$router.back()
            }
             
        },
        onShare(){
            modal.toast({
                message: 'onShare',
                duration: 0.3
            })
        },
    }
}
</script>




