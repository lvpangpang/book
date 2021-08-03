# 基础知识
## 1.原始类型
* number
* string
* undefined
* null
* boolean
* symbol
* BigIn

## 2. 双问号+双感叹号
* value1 ?? value2。只有当value1为null或者 undefined时取value2，否则取value1（0,false,""被认为是有意义的，所以还是取value1）
```javascript
var a = 1
var b = 2
a ?? b // 1
```

* !!将其他类型都转换成boolean型 
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
1. encodeURI方法不会对下列字符编码 ASCII字母 数字 ~!@#$&*()=:/,;?+'
2. encodeURIComponent方法不会对下列字符编码 ASCII字母 数字 ~!*()'
3. 所以encodeURIComponent比encodeURI编码的范围更大
4. 如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。
5. 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。