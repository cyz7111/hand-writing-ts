/**
 * 是什么?------promise 是一个异步函数
 * 有什么用?----给链式调用提供了基础???管理实例???
 * 怎么用?------接收一个函数，返回一个promise对象
 * 
 * 常见方法：resolve .then(success,(err)=>{})==.catch()   reject all race 
 * 
 * 关联知识点：async/await
 */

/**
 * 实现一个  promise
 * @param {Function} fn
 * @returns {promise}
 * 看成一个状态机:pending/resolved/rejected  状态一旦改变就不能再次变化
 * then 函数会返回一个新的 Promise 实例
 */


// 1.三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function myPromise(fn) {
  // this指向
  const _this = this
  _this.currentState = PENDING
  _this.value = undefined

  // 用于保存 then 中的回调，只有当 promise 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = []
  _this.rejectedCallbacks = []

  _this.resolve = function (value) {
    // 递归执行?干什么?
    if (value instanceof myPromise) {
      return value.then(_this.resolve, _this.reject)
    }
    // 异步执行 保证执行顺序
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED
        _this.value = value
        _this.resolvedCallbacks.forEach(cb => cb())
      }
    })
  }

  _this.reject = function (reason) {
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED
        _this.value = reason
        _this.rejectedCallbacks.forEach(cb => cb())
      }
    })
  }

  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject)
  } catch (e) {
    _this.reject(e)
  }
}

/**
 * 
 * @param {Function} onResolved 
 * @param {Function} onRejected 
 * @return {Promise}
 * then 必须返回一个新的 promise
 * onResolved 和 onRejected 都为可选参数
 * 如果类型不是函数需要忽略，同时也实现了透传??
 */
myPromise.prototype.then = function (onResolved, onRejected) {
  let self = this
  let pr

  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r}

  if(self.currentState===RESOLVED){
    pr=new myPromise((resolve,reject)=>{
      setTimeout(()=>{
        try{
          let res=onResolved(self.value)
          resolutionProcedure(pr,res,resolve,reject)
        }catch(e){
          reject(e)
        }
      })
    })
    return pr
  }

  if(self.currentState===REJECTED){
    pr=new myPromise((resolve,reject)=>{
setTimeout(()=>{
  try{
    
  }catch(e){reject(e)}
})
    })
  }

}