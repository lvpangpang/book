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
      console.log(one);
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
 
// 3.最佳观光组合

/* 
  给定正整数数组 A，A[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的距离为 j - i。
  一对景点（i < j）组成的观光组合的得分为（A[i] + A[j] + i - j）：景点的评分之和减去它们两者之间的距离。
  返回一对观光景点能取得的最高分。
*/

/* 
  输入：[8,1,5,2,6]
  输出：11
  解释：i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11 
*/

/**
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function(A) {
  const len = A.length;
  let max = 0;
  for(var i=0; i<len-1; i++) {
    var a = A[i];
    var k = i+1;
    while(k<len) {
      var b = A[k];
      var temp = a + b - (k - i);
      k++;
      if(temp>max) {
        max = temp;
      }
    }
  }
  return max;
};


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

// 6.环形链表
/* 给定一个链表，判断链表中是否有环。为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。 */
import Axios from "./Axios";
const axios = new Axios(true);
const MyAxios = (function () {
  function MyAxios() {}
  MyAxios.prototype.get = function (path, params = {}) {
    return axios.get(path).catch((err) => {
      // return Promise.resolve({
      //   code: 444,
      //   data: null,
      //   message: "catch error",
      //   err
      // });
      // 可不用 Promise.resolve 静态方法，因为在Promise链里返回的都会是一个 Promise 对象
      return {
        code: 444,
        data: null,
        message: "catch error",
        err
      };
    });
  };
  MyAxios.prototype.post = function (path, params) {
    return axios.post(path).catch((err) => {
      return {
        code: 444,
        data: null,
        message: "catch error",
        err
      };
    });
  };
  return MyAxios;
})();
export default MyAxios;

