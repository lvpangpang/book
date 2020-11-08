#### event loop

1. 同步代码依次执行，并且收集有几个宏任务以及其对应的微任务。
2. 执行第一个宏任务里面的同步代码后再执行这个宏任务里面的微任务。
3. 循环执行步骤2，直到所有宏任务以及对应的微任务都被执行完毕。

> 微任务包括：MutationObserver、Promise.then()或catch()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。
> 宏任务包括：script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering。
> 注意⚠️：在所有任务开始的时候，由于宏任务中包括了script，所以浏览器会先执行一个宏任务，在这个过程中你看到的延迟任务(例如setTimeout)将被放到下一轮宏任务中来执行。