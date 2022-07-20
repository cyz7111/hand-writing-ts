/**
 * 实现一个  race
 * @param {Array} promises [promise,promise]
 * @returns {Promise} promise
 * 只要有一个 promise 执行完，直接 resolve 并停止执行
 */
 function myRace(promises) {

    return new Promise((resolve, reject) => {
      if (promises && promises.length === 0) {
        return
      }
  
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(data => {
          resolve(data)
          return
        }).catch(err => {
          reject(err)
          return
        })
      }
    })
  }