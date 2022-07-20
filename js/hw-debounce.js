/**
 * 这是一个防抖函数
 * 
 * 防抖 : 使用场景?  你很奇怪?
 * 
 * 表单事件，滚动事件，鼠标事件，按钮点击，窗口变化
 * 
 * 怎么解析?
 * 
 */

function myDebounce(func, wait = 2000) {

    if (!func instanceof Function) return false

    let timer = 0

    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }

}

let debounceBtn=document.getElementById('debounce-btn')

debounceBtn.addEventListener('input',myDebounce(()=>{
    console.log('防抖后处理的函数');
},1000))