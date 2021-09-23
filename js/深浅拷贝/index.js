function deepCopy(obj) {
  const result = Array.isArray(obj) ? [] : {}
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      if (obj[x] instanceof Date) {
        result[x] = new Date(obj[x].getTime())
      } else if (obj[x] instanceof RegExp) {
        result[x] = new RegExp(obj[x])
      } else if (obj[x] && typeof obj[x] === 'object') {
        result[x] = deepCopy(obj[x])
      } else {
        result[x] = obj[x]
      }
    }
  }
  return result
}

const obj = {
  name: '吕肥肥',
  arr: [1, 2, 3],
  pattern: /jack/g,
  birthday: new Date(),
  say: () => {
    console.log(this.name)
  },
}
const target = deepCopy(obj)
target.arr = [4, 5]
target.pattern = /abc/g
target.birthday = new Date('2000/01/01')
console.log(obj)
console.log(target)
