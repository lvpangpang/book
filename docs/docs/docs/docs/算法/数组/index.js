function threeAdd(nums) {
  const result = []
  const len = nums.length
  nums.sort((a, b) => {
    return a - b
  })
  for (var i = 0; i < len - 2; i++) {
    let k = i + 1
    let j = len - i
    while (k < j) {
      let temp = nums[i] + nums[k] + nums[j]
      if (temp === 0) {
        result.push([nums[i], nums[k], nums[j]])
        k++
        j--
      } else if (temp < 0) {
        k++
      } else {
        j--
      }
    }
  }
  return result
}

const nums = [-2, -1, 0, 1, 2]
console.log(threeAdd(nums))
