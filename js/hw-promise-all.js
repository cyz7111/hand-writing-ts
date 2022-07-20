/**
 * 实现一个  all
 * @param {Array} promises 参数 [peomise,promise]
 * @returns {Array} [promise,promise]
 * 传入参数为一个空的可迭代对象，则直接进行resolve
 * 参数中有一个promise失败，那么Promise.all返回的promise对象失败
 * 在任何情况下，返回的 promise 的完成状态的结果都是一个数组
 */
 function myAll(promises) {
    return new Promise((resolve, reject) => {
      let results = []
      let index = 0
      if (promises && promises.length === 0) {
        resolve(results)
        return
      }
  
      for (let i = 1; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(data => {
          results[i] = data
          index++
          if (index === i) resolve(results)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }