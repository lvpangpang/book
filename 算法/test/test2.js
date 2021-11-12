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
        value: item
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
