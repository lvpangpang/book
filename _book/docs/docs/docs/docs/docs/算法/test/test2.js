/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const len = s.length
  const res = {}
  for (var i = 0; i < len; i++) {
    if (!res[s[i]]) {
      if (Object.values(res).includes(t[i])) {
        return false
      }
      res[s[i]] = t[i]
    } else {
      if (res[s[i]] !== t[i]) {
        return false
      }
    }
  }
  return true
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const res = {}
  const len = nums.length
  for (var i = 0; i < len; i++) {
    let item = nums[i]
    if (!res[item]) {
      res[item] = 1
    } else {
      res[item]++
      if (res[item] === 2) {
        return true
      }
    }
  }
  return false
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const res = {}
  const len = nums.length
  for (var i = 0; i < len; i++) {
    let item = nums[i]
    if (!res[item]) {
      res[item] = {
        index: i,
        value: item,
      }
    } else {
      if (i - res[item]['index'] <= k) {
        return true
      } else {
        res[item] = {
          index: i,
          value: item,
        }
      }
    }
  }
  return false
}

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  const len = numbers.length
  let i = 0
  let k = len - 1
  while (i < k) {
    let item1 = numbers[i]
    let item2 = numbers[k]
    let temp = item1 + item2
    if (temp === target) {
      return [i + 1, k + 1]
    } else if (temp > target) {
      k--
    } else {
      i++
    }
  }
}

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  const len = numbers.length
  for (var i = 0; i < len; i++) {
    let temp = target - numbers[i]
    let index = numbers.indexOf(temp)
    if (index !== -1 && index !== i) {
      return [index + 1, i + 1].sort((a, b) => a - b)
    }
  }
}

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let map = {}
  for (var i = 0; i < str.length; i++) {
    map[str[i]] = i + 1
  }
  const len = columnTitle.length
  let res = 0
  for (var i = 0; i < columnTitle.length; i++) {
    let pow = Math.pow(26, len - i - 1)
    res += map[columnTitle[i]] * pow
  }
  return res
}

;(1 * 26) ^ (1 + 2 * 26) ^ 0
;(26 * 26) ^ (1 + 25 * 26) ^ 0

/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let map = {}
  for (var i = 0; i < str.length; i++) {
    map[i + 1] = str[i]
  }
  map[0] = 'Z'
  let res = ''
  let temp = columnNumber
  while (temp > 26) {
    let r = temp % 26
    if (r === 0) {
      temp = temp / 26 - 1
    } else {
      temp = Math.floor(temp / 26)
    }
  }
  res += map[temp]
  return res.split('').reverse().join('')
}

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// 输入：num1 = "456", num2 = "77"
// 输出："533"
var addStrings = function (num1, num2) {
  num1 = num1.split('')
  num2 = num2.split('')
  let str = []
  let abc = 0
  while (num1.length || num2.length) {
    let temp = (parseInt(num1.pop()) || 0) + (parseInt(num2.pop()) || 0) + abc
    if (temp > 9) {
      abc = 1
      str.unshift(temp % 10)
    } else {
      abc = 0
      str.unshift(temp)
    }
  }
  if (abc) {
    str.unshift(1)
  }
  return str.join('')
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const len = nums.length
  let arr = []
  for (var i = 0; i <= len; i++) {
    arr.push(i)
  }
  for (var i = 0; i < arr.length; i++) {
    if (!nums.includes(arr[i])) {
      return arr[i]
    }
  }
}


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const len = nums1.length
  const arr = []
  for(var i=0; i<len; i++) {
    if(nums2.includes(nums1[i])) {
      arr.push(nums1[i])
    }
  }
  return [...new Set(arr)]
};