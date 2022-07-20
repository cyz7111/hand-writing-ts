/**
 * 实现一个  reject
 * @param {Any} reason 参数
 * @returns {Promise}
 * 传入的参数会作为一个 reason 原封不动地往下传
 */
 function myReject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }