# 精度问题

## 1.常识

JavaScript 存储小数和其它语言如 Java 和 Python 都不同，JavaScript 中所有数字包括整数和小数都只有一种类型 即 Number 类型 它的实现遵循 IEEE 754 标准
javascript 以 64 位双精度浮点数存储所有 Number 类型值 即计算机最多存储 64 位二进制数。

## 2.产生原因

如 圆周率 3.1415926...，1.3333... 等，在转换为二进制的科学记数法的形式时只保留 64 位有效的数字，此时只能模仿十进制进行四舍五入了，但是二进制只有 0 和 1 两个，于是变为 0 舍 1 入。在这一步出现了错误，那么一步错步步错，那么在计算机存储小数时也就理所应当的出现了误差。这即是计算机中部分浮点数运算时出现误差，这就是丢失精度的根本原因

```javascript
0.1 >>> 0.0001 1001 1001 1001...（1001无限循环）
0.2 >>> 0.0011 0011 0011 0011...（0011无限循环）
```

## 3.解决方案

将浮点数 toString 后 indexOf(".")，记录一下两个值小数点后面的位数的长度，做比较，取最大值(即为扩大多少倍数)，计算完成之后再缩小回来。

```javascript
// 加
export function accAdd(arg1, arg2) {
  var r1, r2, m, len, result
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  len = Math.max(r1, r2)
  m = Math.pow(10, len)
  result = (arg1 * m + arg2 * m) / m
  return result.toFixed(len)
}

// 减
export function accSubtr(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘
export function floatMultiply(arg1, arg2) {
  if (arg1 == null || arg2 == null) {
    return null
  }
  var n1, n2
  var r1, r2 // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  n1 = Number(arg1.toString().replace('.', ''))
  n2 = Number(arg2.toString().replace('.', ''))
  return (n1 * n2) / Math.pow(10, r1 + r2)
}

// 除
export function floatDivide(arg1, arg2) {
  if (arg1 == null) {
    return null
  }
  if (arg2 == null || arg2 == 0) {
    return null
  }
  var n1, n2
  var r1, r2 // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  n1 = Number(arg1.toString().replace('.', ''))
  n2 = Number(arg2.toString().replace('.', ''))
  return (n1 / n2) * Math.pow(10, r2 - r1)
}
```

## 4.toFixed()

toFixed 方法可以把 Number 四舍五入位指定小数位数的数字。但是其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则。
银行家舍入：
四舍六入五取偶（四舍六如五留双），简单就是说：四舍六入五考虑，五后非 0 进 1，五后为 0 看奇偶，五前为偶应舍去，五前为奇要进 1

**实际上，如果只是单纯的 2 小数之间的计算，最终保留 2 位小数，直接把结果 toFixed(2)即可，因为 2 小数相加，最终的结果一定也是 2 小数**
解决方案

```javascript
function toFixed(number, precision) {
  var str = number + ''
  var len = str.length
  var last = str.substring(len - 1, len)
  if (last == '5') {
    last = '6'
    str = str.substring(0, len - 1) + last
    return (str - 0).toFixed(precision)
  } else {
    return number.toFixed(precision)
  }
}
function toFixed(num, s) {
  var times = Math.pow(10, s)
  // 0.5 为了舍入
  var des = num * times + 0.5
  // 去除小数
  des = parseInt(des, 10) / times
  return des + ''
}
```

## 5.处理库

number-precision(生产环境建议直接用库来处理)

```javascript
import NP from 'number-precision'

function Number() {
  return (
    <div>
      <div>{NP.plus(0.1, 0.2)}</div>
      <div>{NP.plus(1.11, 8.88)}</div>
      <div>{0.1 + 0.05}</div>
      <div>{NP.plus(0.1, 0.05)}</div>
      <div>{(0.15).toFixed(1)}</div>
      <div>{NP.round(NP.plus(0.1, 0.05), 1)}</div>
    </div>
  )
}
```
