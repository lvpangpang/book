// 1.给定一个整数数组 A，找到 min(B) 的总和，其中 B 的范围为 A 的每个（连续）子数组。
/**
 * @param {number[]} arr
 * @return {number}
 */
// 获取一个数组所有的子数组集合
function allSubsets(arr=[1, 2, 3]) {
  let res = [[]];
  for (let i = 0; i < arr.length; i++) {
    const tempRes = res.map(item => {
      const one = item.concat([]);
      one.push(arr[i]);

      return one;
    });
    res = res.concat(tempRes);
  }
  return res;
};

// 2.给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
/*输入：
  A: [1,2,3,2,1]
  B: [3,2,1,4,7]
  输出：3
  解释：
  长度最长的公共子数组是 [3, 2, 1] 。
*/
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */

var findLength = function(A, B) {
  var max = 0;
  var lenA = A.length;
  var lenB = B.length;
  for(var i=0; i<lenA; i++) {
    var a = A[i];
    for(var k=0; k<lenB; k++) {
      var b = B[k];
      // 找到第一个相等的
      if(a===b) {
        var len = 1;
        while(i+len<lenA && k+len<lenB && A[i+len] === B[k+len]) {
          len += 1;
        }
        if(len> max) {
          max = len;
        }
      }
    }
  }
  return max;
};
 
// 3. 合并2个有序数组
/* 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。 */


// 4. 两数之和
/* 
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。 
*/
/* 给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1] */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 双指针方法
var twoSum = function(nums, target) {
  let len = nums.length;
  let left = 0;
  let right = len - 1;
  while(left<right) {
    let sum = nums[left] + nums[right];
    if(sum===target) {
      return [left, right];
    }
    if(sum<target) {
      left++;
    }
    if(sum>target) {
      right--;
    }
  }
};

// 加法转为减法
var twoSum = function(nums, target) {
  let res = {};
  for(var i=0; i<nums.length; i++) {
    if(res[target-nums[i]]!==undefined) {
      return [res[target-nums[i]], i]
    }
    res[nums[i]] = i;
  }
};

// 5. 反转字符串
// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
function reverseString(str) {
  var left = 0;
  var right = str.length - 1;
  while(left<right) {
    [str[left], str[right]] = [str[right], str[left]];
    left++;
    right--;
  }
}

// 6. 数组中重复的数字
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  const len = nums.length;
  const obj = {};
  for(var i=0; i<len; i++) {
    if(obj[nums[i]]) {
      return nums[i]
    } else {
      obj[nums[i]] = nums[i];
    }
  }
  return null;
};