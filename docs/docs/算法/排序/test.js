// 冒泡排序
function sort1(arr) {
  const len = arr.length
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// 快速排序
function sort2(arr) {
  const len = arr.length
  if (len === 0) {
    return []
  }

  const middle = Math.floor(len / 2)
  const middleNum = arr.splice(middle, 1)
  const left = []
  const right = []

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < middleNum) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return sort2(left).concat(middleNum, sort2(right))
}

function test(person) {
  person.age = 26
  person = {
    name: 'hzj',
    age: 18,
  }
  return person
}
const p1 = {
  name: 'fyq',
  age: 19,
}
const p2 = test(p1)
console.log(p1) // {name: 'fyq', age: 26 }
console.log(p2) // -> {name: 'hzj', age: 19}
