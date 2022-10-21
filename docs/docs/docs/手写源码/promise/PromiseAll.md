# Promise.all()

```js
function PromiseAll(promise) {
  if (!Array.isArray(promise)) {
    return new TypeError('promise 必须是数组')
  }
  return new Promise((resolve, reject) => {
    let result = []
    let num = 0
    const len = promise.length
    promise.forEach((item, index) => {
      item
        .then((data) => {
          result[index] = data
          num++
          if (num === len) {
            resolve(result)
          }
        })
        .cacth((error) => {
          reject(error)
        })
    })
  })
}
```
