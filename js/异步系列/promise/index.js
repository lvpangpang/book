let promise1 = new Promise((resolve, reject) => {
  resolve();
})
promise1.then(() => {
  Promise.reject(123)
}).catch((err) => {
  console.log(err);
})