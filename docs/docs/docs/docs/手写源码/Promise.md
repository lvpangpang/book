# Promise

```javascript
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
        // 依次执行之前存的回调函数
        this.resolveList.forEach((fn) => {
          fn()
        })
        this.resolveList = []
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectList.forEach((fn) => {
          fn()
        })
        this.rejectList = []
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

  then(resolve = () => {}, reject = () => {}) {
    // 如果状态为待定状态，暂时保存两个回调
    if (this.status === PENDING) {
      this.resolveList.push(() => {
        resolve(this.value)
      })
      this.rejectList.push(() => {
        reject(this.reason)
      })
    }
    // 如果当前状态为成功，执行成功回调
    if (this.status === RESOLVED) {
      resolve(this.value)
    }
    // 如果当前状态为失败，执行失败回调
    if (this.status === REJECTED) {
      reject(this.reason)
    }
  }

  then(success = (value) => value, failure = (value) => value) {
    // .then返回的是一个新的Promise
    return new MyPromise((resolve, reject) => {
      const successFn = (value) => {
        try {
          const result = success(value)
          // 如果结果值是一个Promise，那么需要将这个Promise的值继续往下传递，否则直接resolve即可
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      const failureFn = (value) => {
        try {
          const result = failure(value)
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // 如果Promise的状态还未结束，则将成功和失败的函数缓存到队列里
      if (this.status === PENDING) {
        this.resolveList.push(successFn)
        this.rejectList.push(failureFn)
        // 如果已经成功结束，直接执行成功回调
      } else if (this.status === RESOLVED) {
        success(this.value)
      } else {
        // 如果已经失败，直接执行失败回调
        failure(this.value)
      }
    })
  }
}
```
