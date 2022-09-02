/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x === 0) {
    return x
  }
  let res = 0
  if (x > 0) {
    res = (x + '').split('').reverse().join('')
  }
  if (x < 0) {
    res = -(x * -1 + '').split('').reverse().join('')
  }
  if (res >= Math.pow(-2, 31) && res <= Math.pow(2, 31) - 1) {
    return Number(res)
  } else {
    return 0
  }
}

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x === 0) {
    return true
  }
  if (x < 0) {
    return false
  }
  return (x + '').split('').reverse().join('') == x
}

/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function (strs) {
  let strFirst = strs[0]
  const len = strs.length
  if (len === 0) {
    return ''
  }
  if (len === 1) {
    return strFirst
  }
  let x = 1
  let flag = true
  for (var i = 0; i < strFirst.length; i++) {
    if (!flag) {
      break
    }
    let tem = strFirst.substr(0, x)
    for (var k = 1; k < len; k++) {
      if (strs[k].indexOf(tem) !== 0) {
        flag = false
        break
      }
      if (k === len - 1) {
        x++
      }
    }
  }
  return strFirst.substr(0, x - 1)
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  for (var i = 0; i < nums.length; i++) {
    if (nums[i + 1] === nums[i]) {
      nums.splice(i + 1, 1)
      i--
    }
  }
  return nums.length
}