let res = []
function flat(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flat(arr[i])
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// function flat(arr) {
//   return arr.reduce((result, item) => {
//     return result.concat(Array.isArray(item) ? flat(item) : item)
//   }, [])
// }

console.log(
  flat([
    [1, 2],
    [3, [4, 5]],
  ])
)
