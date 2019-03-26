<template>
    <div class="navBar" :style="{marginTop:statusHeight}">
        <image style="width:60px;height:60px;" src="bmlocal://assets/back_icon.png" @click="onBack"></image>
        <text style="flex:1;color:white;size:32px;text-align:center;">{{title}}</text>
        <image style="width:60px;height:60px;" src="bmlocal://assets/share_icon.png" @click="onShare"></image>
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
    props:['title','onBackTag'],
   
    data(){
        return{
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
