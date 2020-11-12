// 函数防抖关注一定时间连续触发的事件只在最后执行一次，而函数节流侧重于一段时间内只执行一次。

// 防抖-300ms內執行5次我只支持最後一次
// 節流-300ms內我只執行一次

// 函数节流-每隔一段时间，只执行一次函数。
function throttle(fn, delay) {
  var timer;
  return function () {
    var _this = this;
    var args = arguments;
    // 与防抖不同点在这，如果当前定时器有则不执行代码
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
      timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}

// 节流时间戳版本
function throttle(fn, delay) {
  var previous = 0;
  // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
  return function () {
    var _this = this;
    var args = arguments;
    var now = new Date();
    if (now - previous > delay) {
      fn.apply(_this, args);
      previous = now;
    }
  }
}

// 函数防抖-在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
function debounce(fn, delay) {
  var timer; // 维护一个 timer
  return function () {
    var _this = this; // 取debounce执行作用域的this
    var args = arguments;
    // 与节流不同点在这，如果当前定时器有则清除定时器
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay);
  };
}



function throttle(fn, delay=300) {
  let timer = null;
  return function() {
    let _this = this;
    let args = arguments;
    if(timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(_this, args);
      timer = null;
    }, delay);
  };
}

function debounce(fn, delay=300) {
  let timer = null;
  return function() {
    let _this = this;
    let args = arguments;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, delay);
  };
}