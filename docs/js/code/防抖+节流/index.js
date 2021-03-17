// 防抖
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
let timer = null;
function debounce1(fn, time) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, time||300);
}

function debounce2(fn, time) {
  let timer = null;
  return function() {
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

// 节流
// 每隔一段时间，只执行一次函数。
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