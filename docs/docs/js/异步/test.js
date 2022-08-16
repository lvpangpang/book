const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'

class MyPromise {
  constructor(exec) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.resolveList = []
    this.rejectList = []

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVE
        this.value = value
        this.resolveList.forEach((fn) => {
          fn()
        })
      }
    }

    let reject = (value) => {
      if (this.status === PENDING) {
        this.status = REJECT
        this.reason = value
        this.rejectList.forEach((fn) => {
          fn()
        })
      }
    }

    try {
      exec(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static all(promiseArr) {
    let count = 0
    const result = []
    return new MyPromise((resolve, reject) => {
      for (var i = 0; i < promiseArr.length; i++) {
        Promise.resolve(promiseArr[i]).then(
          (data) => {
            count++
            result[i] = data
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
        Promise.resolve(promiseArr[i]).then(
          (data) => {
            resolve(data)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  then(resolve = () => {}, reject = () => {}) {
    if (this.status === PENDING) {
      this.resolveList.push(() => {
        resolve(this.value)
      })
      this.rejectList.push(() => {
        reject(this.reason)
      })
    }
    if (this.status === RESOLVE) {
      resolve(this.value)
    }
    if (this.status === REJECT) {
      reject(this.reason)
    }
  }
}

let p1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then((data) => {
  console.log(data)
})
