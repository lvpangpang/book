// 1. 数组中占比超过一半的元素称之为主要元素。给定一个整数数组，找到它的主要元素。若没有，返回-1。
// 示例 1：
// 输入：[1,2,5,9,5,9,5,5,5]
// 输出：5
var majorityElement = function(nums) {
  nums.sort((a, b) => {
    return a - b 
  })
  const len = nums.length
  const max = len/2
  const obj = {}
  for(let k=0; k<len; k++) {
    let item = nums[k]
    if(!obj[item]) {
      obj[item] = 0
    }
    obj[item] ++
    if(obj[item] > max) {
      return item
    }
  }
  return -1
};