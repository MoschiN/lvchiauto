/**
 * Created by Tw93 on 2016/11/4.
 */

export default {

    // 正常模式的tab title配置
    tabTitles: [
        {
            title: '发现',
            icon: 'bmlocal://assets/tab_discovery.png',
            activeIcon: 'bmlocal://assets/tab_discovery_down.png',
            item:'dicover',
        },
        {
            title: '爱车',
            icon: 'bmlocal://assets/tab_mycar.png',
            activeIcon: 'bmlocal://assets/tab_mycar_down.png',
            item:'dicover.detail',
        },
        {
            title: '服务',
            icon: 'bmlocal://assets/tab_service.png',
            activeIcon: 'bmlocal://assets/tab_service_down.png',
            badge: 5,
            item:'dicover',
        },
        {
            title: '我的',
            icon: 'bmlocal://assets/tab_mine.png',
            activeIcon: 'bmlocal://assets/tab_mine_down.png',
            dot: true,
            item:'dicover',
        }
    ],
    tabStyles: {
        bgColor: '#272C39',
        titleColor: '#9BA3B2',
        activeTitleColor: '#43CBA8',
        activeBgColor: '#272C39',
        isActiveTitleBold: true,
        iconWidth: 52,
        iconHeight: 52,
        width: 182,
        height: 98,
        fontSize: 20,
        textPaddingLeft: 0,
        textPaddingRight: 0,
    },

    // 使用 iconFont 模式的tab title配置
    tabIconFontTitles: [
        {
            title: '首页',
            codePoint: '\ue623'
        },
        {
            title: '特别推荐',
            codePoint: '\ue608'
        },
        {
            title: '消息中心',
            codePoint: '\ue752',
            badge: 5
        },
        {
            title: '我的主页',
            codePoint: '\ue601',
            dot: true
        }
    ],
    tabIconFontStyles: {
        bgColor: '#272C39',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        width: 160,
        height: 120,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10,
        iconFontSize: 50,
        iconFontMarginBottom: 8,
        iconFontColor: '#333333',
        activeIconFontColor: 'red',
        iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
    }
}