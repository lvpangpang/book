const a = { key: { name: 1 } }
const b = {}
b.key = a.key
a.key = { name: 2 }
console.log(b)

let c = { name: 1 }
let d = {}
d = c
c = { name: 2}
console.log(d)
