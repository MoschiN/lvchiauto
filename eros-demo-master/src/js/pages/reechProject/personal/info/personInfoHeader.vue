<template>
    <div class="wrapper" style="height: 316px;margin-left:auto;margin-right: auto;margin-top: 40px;margin-bottom: 24px;background-color: #2B303F">

        <image class="header" resize="cover" :src="header"></image>
        <image class="icon" resize="cover" :src="icon"></image>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                header:'bmlocal://assets/Mine/headerImg.png',
                icon:'bmlocal://assets/Mine/headerIcon.png'
            }
        }
    }
</script>

<style scoped>
      .wrapper{
          align-items: center;
          justify-content: center;
      }
      .header{
          width: 160px;
          height: 160px;
      }
    .icon{
        margin-left: 100px;
        margin-top: -30px;
        width: 28px;
        height: 28px;
    }

</style>
