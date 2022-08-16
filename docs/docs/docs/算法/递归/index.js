function reseveStr(str) {
  const len = str.length
  if (len === 1) {
    return str
  }
  return reseveStr(str.slice(1)) + str[0]
}

function compareStr(str) {
  const len = str.length
  if (len === 1) {
    return true
  }
  if (len === 2) {
    return str[0] === srt[1]
  }
  if (str[0] === str[len - 1]) {
    return compareStr(1, -1)
  }
  return false
}

function pingArr(arr) {
  const res = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(pingArr(item))
    } else {
      res.push(item)
    }
  })
  return res
}

function obj1(obj) {
  let res = 0
  for (var i in obj) {
    const item = obj[i]
    if (typeof item === 'number') {
      if (item % 2 === 0) {
        res += item
      }
    } else {
      res += obj1(item)
    }
  }
  return res
}

function abc(obj) {
  let arr = []
  for (var x in obj) {
    const item = obj[x]
    if (typeof item === 'string') {
      arr.push(item)
    } else {
      arr = arr.concat(abc(item))
    }
  }
  return arr
}
