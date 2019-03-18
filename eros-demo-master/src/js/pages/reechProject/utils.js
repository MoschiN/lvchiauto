export default{
    arrayToJson
}

function arrayToJson(array,map){
    var jsonArray=new Array(array.length)
    for(var i=0;i<array.length;i++){
        var json={"key":''+i,"value":''+array[i]}
        if(map.size>0){
            var keys=map.keys()
            for(var key of keys){
                json[key]=map.get(key)
            }
        }
        jsonArray[i]=json
    }
    return jsonArray
}