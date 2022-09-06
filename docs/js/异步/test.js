const submitData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}

Promise.resolve().then((data) => {
  submitData() // 这里不返回值，所以后面的then会马上执行
}).then((data) => {
  console.log(data)
})


Promise.resolve().then((data) => {
  return submitData() // 这里返回Promise，所以后面的then会等待这个Promise执行后再考虑是否执行
}).then((data) => {
  console.log(data)
})