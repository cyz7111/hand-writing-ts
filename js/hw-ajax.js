/**
 * 这是一个自封装的Ajax函数
 * 
 * 依赖原生XMLHttpRequest()
 * 
 */

function myAjax(method, url) {

    let xhr = new XMLHttpRequest()

    // 方法1：原生
    // xhr.open(method, url)
    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             let string = xhr.responseText
    //             let object = JSON.parse(string)
    //             return object
    //         }
    //     }else{
    //         return `${xhr.status}-请求错误`
    //     }
    // }
    // xhr.send()

    // 方法2：promise
    const prom = new Promise((resolve, reject) => {
        // 与服务器建立连接
        xhr.open(method, url)
        // 监听 XMLHttpRequest 代理当前所处的状态
        xhr.onreadystatechange = () => {
            // 当服务器响应全部完成
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(`${xhr.status}-请求错误`)
                }
            }
        }
        // 把请求主体的信息基于send发送给服务器
        xhr.send()
    })

    return prom
}

const method = 'get'
const url = 'https://www.google.com'

myAjax(method, url)