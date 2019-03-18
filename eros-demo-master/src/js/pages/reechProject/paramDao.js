
// 用于请求服务器的参数拼接
const defaultMap = {
    ct: 'android',
    cv: '1.0'
}

export default {
    test: '测试时',
    getParamsJSON,
    getParamsForm,
}
function get() {
    return '0'
}


import MD5 from './utils/md5'
function getParamsJSON(paramMap) {
    // 添加客户端信息和时间戳
    paramMap.set('ct', 'android')
    paramMap.set('cv', '1.0')
    paramMap.set('timeStamp', new Date().getTime())
    // 将key转化为数组,然后按字符串ascii码进行默认排序
    var keysArray = [...paramMap.keys()].sort()
    // 拼接
    var json = {}
    var signStr = ''
    for (const key in keysArray) {
        json[keysArray[key]] = paramMap.get(keysArray[key])
        signStr += keysArray[key] + '=' + paramMap.get(keysArray[key]) + '&'
    }
    json['reechautoSign'] = MD5.hex_md5(signStr + "reechauto@123")
    return json;
}
function getParamsForm(paramMap) {
    // 添加客户端信息和时间戳
    // paramMap.set('ct', 'android')
    // paramMap.set('cv', '1.0')
    // paramMap.set('timeStamp', new Date().getTime())
    // 将key转化为数组,然后按字符串ascii码进行默认排序
    var keysArray = [...paramMap.keys()].sort()
    // 拼接
    var signStr = ''
    for (const key in keysArray) {
        signStr += keysArray[key] + '=' + paramMap.get(keysArray[key]) + '&'
    }
    return signStr;
}