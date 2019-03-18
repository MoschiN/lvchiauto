// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始

export default {
    // 春晓
    'jump': {
        title: '设置',
        url: '/pages/reechProject/personal/set.js',
        gesBack: true,
        canBack: true,
        statusBarStyle: 'LightContent'
    },
    'pushInfoVC': {
        title: '编辑个人信息',
        url: '/pages/reechProject/personal/info/personInfo.js',
        gesBack: true,
        canBack: true,
        statusBarStyle: 'LightContent'
    },
    'suggest': {
        url: '/pages/reechProject/personal/suggestion/suggestion.js',
        gesBack: true,
        canBack: true,
        statusBarStyle: 'LightContent'
    },
    'pushWriteSuggest': {
        url: '/pages/reechProject/personal/suggestion/writeSug.js',
        gesBack: true,
        canBack: true,
        statusBarStyle: 'LightContent'
    },
    'suggestDetail': {
        url: '/pages/reechProject/personal/suggestion/suggestDetail.js',
        gesBack: true,
        canBack: true
    },
    'messageCenter': {
        url: '/pages/reechProject/personal/messageCenter/message.js',
        gesBack: true,
        canBack: true
    },
    'personCenter': {
        url: '/pages/reechProject/personal/mine/personCenter.js',
        gesBack: true,
        canBack: true
    },
    // 阳哥
    'serviceList': {
        url: '/pages/reechProject/server/page.js'
    },
    'loginNext': {
        url: '/pages/reechProject/login/msg.js'
    },
    'homePage': {
        url: '/pages/reechProject/index.js'
    },
    // 
    'discover': {
        title: '发现模块',
        url: '/pages/reechProject/discover/index.js'
    },
    'discover.news': {
        title: '资讯',
        url: '/pages/reechProject/discover/news.js'
    },
    'discoverdetail': {
        url: '/pages/reechProject/discover/detail.js'
    },
    'pushDynamic': {
        url: '/pages/reechProject/discover/pushdynamic.js'
    },
    'commentinput': {
        url: '/pages/reechProject/discover/commentinput.js'
    },
    'demo': {
        title: 'weex-eros demo',
        url: '/pages/demo/index.js'
    },
    'demo.lifecycle': {
        title: '生命周期',
        url: '/pages/demo/lifecycle/index.js'
    },
    'demo.assets': {
        title: '本地资源',
        url: '/pages/demo/assets/index.js'
    },
    'demo.globalAttr': {
        title: '全局属性',
        url: '/pages/demo/globalAttr/index.js'
    },
    'demo.inputExtend': {
        title: '文本框扩展',
        url: '/pages/demo/inputExtend/index.js'
    },
    'demo.refresh': {
        title: '下拉刷新',
        url: '/pages/demo/refresh/index.js'
    },
    'demo.storage': {
        title: '本地化存储',
        url: '/pages/demo/storage/index.js'
    },
    'demo.router': {
        title: '路由',
        url: '/pages/demo/router/index.js'
    },
    'demo.event.a': {
        title: '发布订阅-a页面',
        url: '/pages/demo/event/a.js'
    },
    'demo.event.b': {
        title: '发布订阅-b页面',
        url: '/pages/demo/event/b.js'
    },
    'demo.notice': {
        title: '弹窗通知',
        url: '/pages/demo/notice/index.js'
    },
    'demo.font': {
        title: '字体',
        url: '/pages/demo/font/index.js'
    },
    // 'demo.coms': {
    //     title: '联系功能',
    //     url: '/pages/demo/coms/index.js'
    // },
    'demo.image': {
        title: '图片',
        url: '/pages/demo/image/index.js'
    },
    'demo.bmchart': {
        title: '图表',
        url: '/pages/demo/bmchart/index.js'
    },
    'demo.bmrichtext': {
        title: '富文本',
        url: '/pages/demo/bmrichtext/index.js'
    },
    'demo.bmcalendar': {
        title: '日期',
        url: '/pages/demo/bmcalendar/index.js'
    },
    'demo.other.waterfall': {
        title: 'weex 瀑布流',
        url: '/pages/demo/other/waterfall.js'
    },
    'demo.other.bindingx': {
        title: 'bindingX',
        url: '/pages/demo/other/bindingx.js'
    },
    'demo.other.weex-ui': {
        title: 'weex-ui',
        url: '/pages/demo/other/weexui.js'
    },
    'demo.other.bui': {
        title: 'bui',
        url: '/pages/demo/other/bui.js'
    }
}