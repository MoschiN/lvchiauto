<template>
    <div class="navBar" :style="{marginTop:statusHeight}">
        <image style="width:66px;height:66px;" src="bmlocal://assets/back_icon_src.png" @click="onBack"></image>
        <text style="flex:1;color:white;size:32px;text-align:center;">{{title}}</text>
        <text v-if="'0'==type" style="color:#43CBA8;size:32px;" @click="onRight">{{typedata}}</text>
        <image v-if="'1'==type" style="width:60px;height:60px;" :src="typedata" @click="onRight"></image>
    </div>
</template>
<style lang="sass" scoped>
    .navBar{
        height:98px;
        width:auto;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        padding-left:32px;
        padding-right:36px;
        background-color:#272C39;
    }
</style>
<script>
var modal = weex.requireModule('modal')

export default {
    props:['title','type','typedata','onRightTag'],
   
    data(){
        return{
            statusHeight: Number.parseInt(this.statusBarHeight || weex.config.env.statusBarHeight || 40),
        }
    },
    methods:{
        onRight(){
            if(this.onRightTag!=null)
                this.$event.emit(this.onRightTag)
        },
        onBack(){
           this.$router.back()
        },
    }
}
</script>




