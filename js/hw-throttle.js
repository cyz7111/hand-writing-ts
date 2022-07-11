/**
 * 这是一个节流函数
 * 
 * 使用场景：
 * 
 */

function myThrottle(func,wait=1000){

    //上次执行该函数的时间,不管时间多少,都会先执行一次
    let lastTime=0

    return function(...args) {

        //当前时间-0
        let nowTime= +new Date()

        if(nowTime-lastTime>wait){

            lastTime=nowTime

            func.apply(this,args)
        }

    }
}

setInterval(
    myThrottle(() => {
      console.log('节流后的函数')
    }, 5000),
    100
  )