const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'reject'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = null
    this.reason = null

    this.resolveList = []
    this.rejectList = []

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.resolveList.forEach((fn) => {
          fn()
        })
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
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

  then(resolve, reject = () => {}) {
    if (this.status === PENDING) {
      this.resolveList.push(() => {
        resolve(this.value)
      })
      this.rejectList.push(() => {
        reject(this.reason)
      })
    }
    if (this.status === RESOLVED) {
      resolve(this.value)
    }
    if (this.status === REJECTED) {
      reject(this.reason)
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
    resolve('余多多')
  }, 1500)
})

MyPromise.all([promise1, promise2]).then((res) => {
  console.log(res)
})

MyPromise.race([promise1, promise2]).then((res) => {
  console.log(res)
})
