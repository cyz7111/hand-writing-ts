/**
 * 获取数据类型
 * 
 */

function myGetDataType(data) {
    if(data===null) return String(data)

    if(typeof data === 'object'){
        let type=Object.prototype.toString.call(data)
        return type.replace('[object ','').replace(']','').toLowerCase()
    }else{
        return typeof data
    }   
}

let result;
// result=myGetDataType(null); // -> null
// result=myGetDataType(undefined); // -> undefined
// result=myGetDataType({}); // -> object
// result=myGetDataType([]); // -> array
// result=myGetDataType(123); // -> number
result=myGetDataType(true); // -> boolean
// result=myGetDataType('123'); // -> string
// result=myGetDataType(/123/); // -> regexp
// result=myGetDataType(new Date()); // -> date

console.log('result----',result);