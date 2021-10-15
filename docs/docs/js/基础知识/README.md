# 基础知识
## 1.原始类型
* number
* string
* undefined
* null
* boolean
* symbol
* BigInt
## 2. 双问号+双感叹号
1. 双问号
* value1 ?? value2。只有当value1为null或者 undefined时取value2，否则取value1（0,false,""被认为是有意义的，所以还是取value1）
```javascript
var a = 1
var b = 2
a ?? b // 1
```
2. 双感叹号
* !!将其他类型都转换成boolean型 ，空字符串，0，null都是fasle
```javascript
var a = 1
!!a // true
```
## 3. 垃圾回收
1. 标记清除法
标记-清除算法就是当变量进入环境是，这个变量标记位“进入环境”；而当变量离开环境时，标记为“离开环境”，当垃圾回收时销毁那些带标记的值并回收他们的内存空间。这里说的环境就是执行环境，执行环境定义了变量或函数有权访问的数据。每个执行环境都有一个与之关联的变量对象（variable object），环境中所定义的所以变量和函数都保存在这个对象中。某个执行环境中所有代码执行完毕后，改环境被销毁，保存在其中的所有变量和函数也随之销毁。
2. V8的内存管理
V8采用了分代回收的策略，将内存分为两个生代：新生代和老生代
## 4. 转码
1. encodeURI（decodeURI）方法不会对下列字符编码 ASCII字母 数字 ~!@#$&*()=:/,;?+'
2. encodeURIComponent（decodeURIComponent）方法不会对下列字符编码 ASCII字母 数字 ~!*()'
3. 如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。
4. 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。

## 5. toFixed
toFixed方法可以把Number四舍五入位指定小数位数的数字。但是其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则。
银行家舍入：
四舍六入五取偶（四舍六如五留双），简单就是说：四舍六入五考虑，五后非0进1，五后为0看奇偶，五前为偶应舍去，五前为奇要进1

## 6. JSON.stringify()
将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性

* undefined、任意的函数以及symbol值，出现在**非数组对象**的属性值中时在序列化过程中会被忽略
* undefined、任意的函数以及symbol值出现在**数组**中时会被转换成 null。
* undefined、任意的函数以及symbol值被单独转换时，会返回 undefined