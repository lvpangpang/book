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

console.log(allSubsets())
// var sumSubarrayMins = function (arr) {
//   let res = allSubsets(arr);
//   let sum = 0;
//   res = res.slice(1);
//   res.forEach((item) => {
//     sum += Math.min(...item);
//   });
//   return sum;
// };

// sumSubarrayMins([1, 3, 4])

/**
 * @param {string} palindrome
 * @return {string}
 */
var breakPalindrome = function(palindrome) {
    
};