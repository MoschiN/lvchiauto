<template>
    <div class="wrapper" style="background-color: #272C39">
        <nav class="navi" title="意见反馈" right-text="提交" is-show-right-btn="true"></nav>
        <textarea class="textfeild" placeholder="请告诉我们您在使用App时遇到了什么问题?" maxlength="200">

        </textarea>
    </div>

</template>

<script>
    import nav from '../../common/nav'

    export default {
        components: {nav},
        name: "writeSug"
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
