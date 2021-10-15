# 递归
递归是个压栈出栈的过程
```javascript
// 字符串倒序
function str1(str) {
  if(str.length<=1) return str
  return str1(str.slice(1)) + str[0]
}
```
