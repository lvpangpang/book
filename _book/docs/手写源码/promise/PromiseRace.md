# Promsie.race()

```js
Promise.race = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    return new TypeError('promise 必须是数组')
  }
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      Promise.resolve(p)
        .then((val) => {
          resovle(val)
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}
```
