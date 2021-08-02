# EventLoop
所谓Event Loop，就是事件循环，其实就是JS管理事件执行的一个流程，具体的管理办法由他具体的运行环境确定。
## 1.进程和线程的区别
当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。
## 2.浏览器执行过程
* 执行宏任务
* 执行该宏任务下面对应的所有微任务
* 然后开始下一轮 Event Loop，重复一二步

## 3.node执行过程
* timers: 执行setTimeout和setInterval的回调
* pending callbacks: 执行延迟到下一个循环迭代的 I/O 回调
* idle, prepare: 仅系统内部使用
* poll: 检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。
* check: setImmediate在这里执行
* close callbacks: 一些关闭的回调函数，如：socket.on('close', ...)
## 4.任务分类
* 宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。
* 微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick（遇到就执行） 为 Node 独有。

