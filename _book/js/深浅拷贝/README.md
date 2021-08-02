# 深浅拷贝

## 浅拷贝

1. 类型

+ 直接将一个引用变量赋值给另一个变量
+ Object.assign
+ ...扩展运算符

## 深拷贝

+ JSON.parse(JSON.stringify(target)),不能将方法和 undefined 属性转化为字符串
+ 递归遍历

```javascript
const deepCopy = (obj) => {
  const result = Array.isArray(obj) ? [] : {}
  for(let x in obj) {
    if(obj.hasOwnProperty(x)) {
      if(obj[x] && typeof obj[x] === 'object') {
        result[x] = deepCopy(obj[x])
      } else {
        result[x] = obj[x]
      }
    }
  }
  return result
}
```
