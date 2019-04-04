// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    'eslint': false,
    'webpackWarnings': false,
    'exports': [
        // appBoard
        'js/config/index.js',
        // mediator
        'js/mediator/index.vue',
        // home
        'js/pages/demo/index.vue',
        'js/pages/demo/lifecycle/index.vue',
        'js/pages/demo/assets/index.vue',
        'js/pages/demo/globalAttr/index.vue',
        'js/pages/demo/inputExtend/index.vue',
        'js/pages/demo/refresh/index.vue',
        'js/pages/demo/storage/index.vue',
        'js/pages/demo/router/index.vue',
        'js/pages/demo/router/tabbarItem1.vue',
        'js/pages/demo/router/tabbarItem2.vue',
        'js/pages/demo/router/tabbarItem3.vue',
        'js/pages/demo/event/a.vue',
        'js/pages/demo/event/b.vue',
        'js/pages/demo/notice/index.vue',
        'js/pages/demo/font/index.vue',
        'js/pages/demo/image/index.vue',
        'js/pages/demo/bmchart/index.vue',
        'js/pages/demo/bmrichtext/index.vue',
        'js/pages/demo/bmcalendar/index.vue',
        'js/pages/demo/other/bindingx.vue',
        'js/pages/demo/other/weexui.vue',
        'js/pages/demo/other/bui.vue',
        // 自己的界面
        'js/pages/reechProject/index.vue',
        // 发现模块
        'js/pages/reechProject/discover/index.vue',//发现导页
        'js/pages/reechProject/discover/news.vue',//资讯
        'js/pages/reechProject/discover/detail.vue',//资讯
        'js/pages/reechProject/discover/pushdynamic.vue',//发布动态
        'js/pages/reechProject/discover/commentinput.vue',//评论输入界面
        'js/pages/reechProject/discover/search.vue',//动态资讯搜索界面
        // 登录
        'js/pages/reechProject/login/index.vue',
        'js/pages/reechProject/login/msg.vue',
        // 爱车
        'js/pages/reechProject/myCar/index.vue',
        'js/pages/reechProject/server/index.vue',
        // 我的
        'js/pages/reechProject/server/index.vue',
        'js/pages/reechProject/personal/index.vue',
        'js/pages/reechProject/personal/set.vue',
        'js/pages/reechProject/personal/info/personInfo.vue',
        'js/pages/reechProject/personal/suggestion/suggestion.vue',
        'js/pages/reechProject/personal/suggestion/writeSug.vue',
        'js/pages/reechProject/personal/suggestion/suggestDetail.vue',
        'js/pages/reechProject/personal/messageCenter/message.vue',
        'js/pages/reechProject/personal/mine/personCenter.vue'
    ],
    'alias': {
        'Components': 'js/components',
        'Common': 'js/common',
        'Config': 'js/config',
        'Widget': 'js/widget',
        'Pages': 'js/pages',
        'Utils': 'js/utils'
    },
    'diff': {
        'pwd': '/Users/yangmingzhe/Work/opensource/eros-diff-folder',
        'proxy': 'https://app.weex-eros.com/source'
    },
    'server': {
        'path': './',
        'port': 8889
    },
    'mockServer': {
        'port': 52077,
        'mockDir': './dist/mock'
    },
    'socketServer': {
        'port': 8890,
        'switch': true
    }
}