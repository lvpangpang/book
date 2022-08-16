const path = require('path')

console.log(__dirname)
console.log(process.cwd())
console.log(path.join(__dirname, 'abc.js'))
console.log(path.resolve(__dirname, 'abc.js'))
console.log(path.join(process.cwd(), 'abc.js'))
console.log(path.resolve('/abc.js'))
console.log(path.resolve('abc.js'))


