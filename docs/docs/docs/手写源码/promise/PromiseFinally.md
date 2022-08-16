# Promise.finally()

```js
Promise.prototype.finally = (cb) => {
  return this.then(
    (val) => {
      return Promise.resolve(cb()).then(() => {
        return val
      })
    },
    (err) => {
      return Promise.resolve(cb()).then(() => {
        throw err
      })
    }
  )
}
```
