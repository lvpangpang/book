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
    } catch(error) {
      reject(error)
    }
  }

  then(resolve, reject) {
    if(this.status===PENDING) {
      this.resolveList.push(() => {resolve(this.value)})
      this.rejectList.push(() => {reject(this.reason)})
    }
    if(this.status===RESOLVED) {
      resolve(this.value)
    }
    if(this.status===REJECTED) {
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

