const fs = require('fs')

setTimeout(() => {
  // 新的事件循环的起点
  console.log('1')
}, 0)

setImmediate(() => {
  console.log('setImmediate 1')
})

/// 将会在 poll 阶段执行
fs.readFile('./test.conf', { encoding: 'utf-8' }, (err, data) => {
  console.log('read file success')
})

/// 该部分将会在首次事件循环中执行
Promise.resolve().then(() => {
  console.log('poll callback')
})

// 首次事件循环执行
console.log('2')

// 2
// poll callback

// 1
// setImmediate 1
// read file