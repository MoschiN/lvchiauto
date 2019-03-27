
export default {
    getParamsJSON,
    isEmpty,
    clearArray,
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
    var jsonObj = {}
    var signStr = ''
    for (const key in keysArray) {
        jsonObj[keysArray[key]] = paramMap.get(keysArray[key])
        signStr += keysArray[key] + '=' + paramMap.get(keysArray[key]) + '&'
    }
    jsonObj['reechautoSign'] = MD5.hex_md5(signStr + "reechauto@123")
    return jsonObj
}
function getParamsForm(paramMap) {
    // 添加客户端信息和时间戳
    paramMap.set('ct', 'android')
    paramMap.set('cv', '1.0')
    paramMap.set('timeStamp', new Date().getTime())
    // 将key转化为数组,然后按字符串ascii码进行默认排序
    var keysArray = [...paramMap.keys()].sort()
    // 拼接
    var formText = ''
    for (const key in keysArray) {
        var keyStr = keysArray[key]
        var valueStr = paramMap.get(keysArray[key])
        formText += '&' + keyStr + '=' + valueStr
    }
    return formText.substring(1)
}

function isEmpty(base, param) {
    if (!base.hasOwnProperty(param) || param == 'undefined' || param == 'null' || param == 'NULL' || param == 'Null' || param == '' || param == null)
        return true
    else
        return false
}

function clearArray(array) {
    if (array == null)
        return
    while (array.length > 0) {
        array.pop()
    }
}