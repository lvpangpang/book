## EventLoop
当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

执行过程
+ 执行宏任务
+ 执行对应的所有微任务
+ 然后开始下一轮 Event Loop，重复一二步

宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。
微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick 为 Node 独有。

