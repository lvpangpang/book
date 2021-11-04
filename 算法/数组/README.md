# 数组

数据是前端最常用的数据结构，没有之一
在数组的基础上演变出了队列，栈 2 种特殊的数组数据结构

## 1.常用 API

修改原数组的 API

1. splice

```javascript
const arr = [1, 2, 3, 4, 5]
arr.splice(0, 2) // [1, 2]
arr // [3, 4, 5]
```

2. sort

```javascript
const arr = [1, 2, 3, 4, 5]
arr.sort((a, b) => {
  return b - a
})
arr // [5,4,3,2,1]
```

3. push

```javascript
const arr = [1, 2, 3, 4, 5]
arr.push(...[6, 7])
arr // [1, 2, 3, 4, 5, 6, 7]
```

4. pop

```javascript
const arr = [1, 2, 3, 4, 5]
arr.pop() // 5
arr // [1, 2, 3, 4]
```

5. unshift

```javascript
const arr = [1, 2, 3]
arr.unshift(0) //
arr // [0, 1, 2, 3]
```

6. shift

```javascript
const arr = [1, 2, 3]
arr.shift() // 1
arr // [2, 3]
```

7. from

```javascript
const str = '123'
arr.form(str) // [1,2,3]
```

## 2.常用思路

### 1.双指针

- 将嵌套循环转化为单循环问题
- 通过指针记录状态，从而优化空间复杂度（空间换时间）
- 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。

1. 三数求和.给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

```javascript
const threeSum = function (nums) {
  const res = []
  nums.sort((a, b) => {
    return a - b
  })
  const len = nums.length
  for (var i = 0; i < len - 2; i++) {
    let left = i + 1
    let right = len - i
    while (left < right) {
      let temp = nums[i] + nums[left] + nums[right]
      if (temp === 0) {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
      } else if (temp < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
}
```

2. 反转字符串（其实有其他好多种办法）.编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

```javascript
function reverseString(str) {
  var left = 0
  var right = str.length - 1
  while (left < right) {
    ;[str[left], str[right]] = [str[right], str[left]]
    left++
    right--
  }
}
```

3. 两数之和.给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2

```javascript
var twoSum = function (nums, target) {
  let len = nums.length
  let left = 0
  let right = len - 1
  while (left < right) {
    let sum = nums[left] + nums[right]
    if (sum === target) {
      return [left, right]
    }
    if (sum < target) {
      left++
    }
    if (sum > target) {
      right--
    }
  }
}
```
