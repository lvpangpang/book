## Code 
1. 防抖

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
一定时间内，执行最后一次函数

全局变量版本
```
let timer = null;
function debounce(fn, time) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, time||300);
}
```

闭包版本
```
function debounce(fn, time) {
  let timer = null;
  return () => {
    let _this = this;
    let arg = arguments;
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(_this, arg);// 便于不定个数的参数的传递
    }, time||300);
  }
}
```
应用场景：
连续的事件，只需触发一次回调的场景有：
+ 搜索框搜索输入。只需用户最后一次输入完，再发送请求
+ 手机号、邮箱验证输入检测
+ 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

2. 节流

每隔一段时间，只执行一次函数。
一段时间内，执行第一次函数
```
function throttle(fn, time) {
  let timer = null;
  return function() {
    let _this = this;
    let arg = arguments;
    if(timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(_this, arg);// 便于不定个数的参数的传递
      timer = null;
    }, time||300);
  }
}
```
函数节流的应用场景
间隔一段时间执行一次回调的场景有：
+ 滚动加载，加载更多或滚到底部监听
+ 谷歌搜索框，搜索联想功能
+ 高频点击提交，表单重复提交

3. compose
+ compose的参数是函数，返回的也是一个函数
+ 因为除了第一个函数的接受参数，其他函数的接受参数都是上一个函数的返回值，所以初始函数的参数是多元的，而其他函数的接受值是一元的
+ compsoe函数可以接受任意的参数，所有的参数都是函数，且执行方向是自右向左的，初始函数一定放到参数的最右面
```
var compose = function(...args) {
  var len = args.length
  var count = len - 1
  var result
  return function f1(...args1) {
      result = args[count].apply(this, args1)
      if (count <= 0) {
          count = len - 1
          return result
      } else {
          count--
          return f1.call(null, result)
      }
  }
}
```


