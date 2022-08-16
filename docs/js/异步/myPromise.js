const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'reject'

// then只是搜集需要执行的函数到数组，真正执行的时机在resolve，reject方法中
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = null

    this.resolveList = []
    this.rejectList = []

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        // 依次执行之前存的回调函数
        this.resolveList.forEach((fn) => {
          fn()
        })
      }
    }

    let reject = (value) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = value
        this.rejectList.forEach((fn) => {
          fn()
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  static all(promiseArr) {
    let result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      for (var i = 0; i < promiseArr.length; i++) {
        Promise.resolve(promiseArr[i]).then(
          (res) => {
            result[i] = res
            count++
            if (count === promiseArr.length) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      for (var i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(res)
          }
        )
      }
    })
  }

  then(resolve=() => {}, reject = () => {}) {
    // 如果状态为待定状态，暂时保存两个回调
    if (this.status === PENDING) {
      this.resolveList.push(() => {
        resolve(this.value)
      })
      this.rejectList.push(() => {
        reject(this.value)
      })
    }

    // 如果当前状态为成功，执行成功回调
    if (this.status === RESOLVED) {
      resolve(this.value)
    }

    // 如果当前状态为失败，执行失败回调
    if (this.status === REJECTED) {
      reject(this.value)
    }
    
  }
}



const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('吕肥肥')
  }, 1000)
})

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('鱼多多')
  }, 1500)
})

MyPromise.all([promise1, promise2]).then((res) => {
  console.log(res)
})

MyPromise.race([promise1, promise2]).then((res) => {
  console.log(res)
})
