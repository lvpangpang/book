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


* [两数之和](/算法/数组/两数之和.md)
* [三数之和](/算法/数组/三数之和.md)

