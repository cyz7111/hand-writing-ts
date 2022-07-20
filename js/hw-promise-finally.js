/**
 *
 * @param {Promise} promise 
 * @param {Callback} callback 
 * @returns {boolean}
 * 无论当前 Promise 是成功还是失败，
 * 调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。
 */
 function myFinally(promise, callback) {
    promise.then(value => {
      return Promise.resolve(callback()).then(() => {
        return value
      })
    }, error => {
      return Promise.resolve(callback()).then(() => {
        throw error
      })
    })
  }