<template>
    <div>
        <text-tab-bar title="发布新动态" type="0" typedata="发布" :onRightTag="onRightTag"></text-tab-bar>
        <div style="width:auto;height:2px;background-color:#212531;"></div>
        <scroller style="flex:1;background-color:#272C39;">
            <textarea type="text" v-model="context" placeholder="分享美好瞬间…" style="height:200px;lines:5;margin-top:49px;placeholder-color:#9BA3B2;color:white;size:28px;margin-left:36px;margin-right:36px;"/>
            <div style="flex-direction:colum;flex-wrap:wrap;margin-top:49px;margin-left:36px;">
                <div v-for="(img,i) in imgs" :key="i" style="width:172px;flex-direction:colum;padding-top:22px;">
                    <image style="width:150px;height:150px;padding:1px;" :src="img===''?'bmlocal://assets/add_image.png':img.path" @click="onAdd(img==='')"></image>
                    <image v-if="img!==''" style="width:44px;height:44px;position:relative;top:-22px;right:22px;" src="bmlocal://assets/delete_image.png" @click="onDelImg(i)"></image>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import textTabBar from '../nav/textnavbar'
import paramDao from '../paramDao'
export default {
    created(){
        // this.$storage.get('loginInfo').then(loginInfo=>{

        // })
       
        this.$router.getParams().then(resData => {
            this.token=resData
        })
        // 发布按钮
        this.$event.on(this.onRightTag, params => {
          var loginInfo=this.$storage.getSync('loginInfo');
          var paramMap=new Map()
          paramMap.set('context',this.context)
          paramMap.set('imagesUrl',this.getImageUrlsParams())
          paramMap.set('userId',loginInfo.data.userInfo.userId)
          
          this.$fetch({
              method: 'POST',    // 大写
              name: 'DISCOVERY.pushDynamic', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
              data: paramDao.getParamsForm(paramMap),
              header:{
                    'Authorization':'Bearer  '+loginInfo.data.token.access_token
              }
          }).then(resData => {
              if(resData.code===1000){
                  this.$router.back()
                  this.$notice.toast({
                        message:'发布成功!'
                    })
              }else{
              }
             
            console.log(resData)
          }, error => {
              // 错误回调
              this.$notice.toast({
                message:error
              })
              console.log(error)
          })
        });
        this.imgs=new Array(0);
        for(var i=0;i<this.imgs.length;i++){
            
            this.imgs[i]={}
            this.imgs[i]['path']='https://reechauto-file.oss-cn-beijing.aliyuncs.com/data20190124/801b215cb05f45b9b7715973e24f162f.jpg?Expires=2179018315&OSSAccessKeyId=LTAI4neWcL5za1ri&Signature=g7OqkfklTN6T72CqzK2WxjdGGRg%3D'
          
        }
        this.imgs.push('')
    },
    components:{
        textTabBar,
    },
    methods:{
        uploadImage(){
            var loginInfo=this.$storage.getSync('loginInfo');
            this.$image.pickAndUpload({
                url: 'http://10.120.8.187:7766/news/file/uploadFile',                     // 自定义图片上传地址，默认上传地址是 eros.native.js 中的 image 地址
                maxCount: 9,                 // 一次最多可选择图片数量 最大支持9张 默认是1
                imageWidth: 1000,            // 图片宽度（根据宽度按比例裁剪）可以不传默认为 800px
                allowCrop: false,             // 是否允许编辑（只有当 maxCount == 1时 此参数才会生效） 默认是false
                params: {

                },                  // 传递的参数
                header:{
                    'Authorization':'Bearer  '+loginInfo.data.token.access_token
                }                  // 自定义请求 header
            })
            .then(resData => {
                // resData=[]
                // var imgTemp={"code":1000,"data":"https://ps.ssl.qhimg.com/dm/664_417_/t017642f38a347fbb51.jpg"}
                // resData.push(imgTemp)
                for(var i=0;i<resData.length;i++){
                    if(resData[i].code===1000){
                        this.addImage(resData[i].data.context)
                    }
                }
                console.log(resData)    // [url1, url2...]
            }, error => {
                console.log(error)
            })
        },
        getImageUrlsParams(){
            var uParam=''
            for(var i=0;i<this.imgs.length-1;i++){
                uParam+=this.imgs[i].path+','
            }
            return uParam
        },
        onAdd(isAdd){
                if(isAdd){
                    this.uploadImage()
                
            }
        },
        addImage(url){
                    var img={}
                    img['path']=url
                   var length=this.imgs.length
                   this.imgs.pop()
                   if(length<9){
                       this.imgs.push(img,'')
                   }else{
                       this.imgs.push(img)
                   }
        },
        onDelImg(index){
            this.imgs.splice(index,1)

            if(this.imgs[this.imgs.length-1]!==''){
                this.imgs.push('')
            }
            
        }
    },
    data(){
        return{
            token:'',
            context:'',
            imgs:null,
            onRightTag:'onPushDynamic'
        }
    },
}
</script>
