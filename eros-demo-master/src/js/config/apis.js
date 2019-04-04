export default {
    // 短信验证码登录
    'AUTH.loginBySms': '/login/message',
    // 密码登录
    'AUTH.loginByPwd': '/login/pwd',
    // 推荐
    'DISCOVERY.queryShare': '/news/newsshare/top',
    // 资讯
    'DISCOVERY.queryNews': '/news/news/query',
    // 动态
    'DISCOVERY.queryDynamic': '/news/share/query',
    // 发布动态
    'DISCOVERY.pushDynamic': '/news/share/push',
    'uploadImage': '/api/file/upload',
    // 查询评论
    'DISCOVERY.queryComment': '/news/comment/query',
    // 发布评论
    'DISCOVERY.sendComment': '/news/comment/add',
    // 点赞
    'DISCOVERY.addlikes': '/news/newsshare/addlikes',
    // 取消点赞
    'DISCOVERY.removeLikes': '/news/newsshare/removeLikes',
    // 添加浏览数
    'DISCOVERY.browse': '/news/news/browse',

    //获得个人信息
     'USERINFO':'/authorization/userinfo',
    //查询我的消息
    'MINEMESSAGE':'/news/notice/query',
    //全部已读
    'READALL':'/news/notice/readAll',
    //未读个数
    'NOREAD':'/news/notice/noread',
    //读单条
    'READ':'/news/notice/read',


    //意见反馈
    'SUGGESTList':'/news/feedback/queryFeedbacksByUserId',
    //提交意见反馈
    'addQuestion':'/news/feedback/addQuestion',

    //查询我的动态
    'MINESHARE':'/news/share/me'

}
