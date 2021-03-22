// 防抖
// 动作绑定事件，动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生，则重新等待一定时间再触发事件。
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
      fn.apply(_this, arg);// 绑定this， 否则this指向window
    }, time||300);
  }
}

// 节流
// 动作绑定事件，动作发生后一段时间后触发事件，在这段时间内，如果动作又发生，则无视该动作，直到事件执行完后，才能重新触发。
function throttle(fn, time) {
  let timer = null;
  return function() {
    let _this = this;
    let arg = arguments;
    if(timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(_this, arg);// 绑定this， 否则this指向window
      timer = null;
    }, time||300);
  }
}