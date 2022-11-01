# scheduler

## 1 实现帧空闲调度任务

刚刚上面说到了在执行可中断的更新时，浏览器会在每一帧空闲时刻去执行 react 更新任务，那么空闲时刻去执行是如何实现的呢？我们很容易联想到一个 api —— requestIdleCallback。但由于 requestIdleCallback 的兼容性问题以及 react 对应部分高优先级任务可能牺牲部分帧的需要，react 通过自己实现了类似的功能代替了 requestIdleCallback。
我们上面讲到执行可中断更新时，performConcurrentWorkOnRoot 函数时通过 scheduleCallback 包裹起来的：

```js
scheduleCallback(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root))
```

scheduleCallback 函数是引用了 packages/scheduler/src/Scheduler.js 路径下的 unstable_scheduleCallback 函数，我们来看一下这个函数，它会去按计划插入调度任务：

```js
// packages/scheduler/src/Scheduler.js

function unstable_scheduleCallback(priorityLevel, callback, options) {
  // ...

  if (startTime > currentTime) {
    // 当前任务已超时，插入超时队列
    // ...
  } else {
    // 任务未超时，插入调度任务队列
    newTask.sortIndex = expirationTime
    push(taskQueue, newTask)
    // 符合更新调度执行的标志
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true
      // requestHostCallback 调度任务
      requestHostCallback(flushWork)
    }
  }

  return newTask
}
```

将任务插入了调度队列之后，会通过 requestHostCallback 函数去调度任务。
react 通过 new MessageChannel() 创建了消息通道，当发现 js 线程空闲时，通过 postMessage 通知 scheduler 开始调度。然后 react 接收到调度开始的通知时，就通过 performWorkUntilDeadline 函数去更新当前帧的结束时间，以及执行任务。从而实现了帧空闲时间的任务调度。

## 2 任务中断

前面说到可中断模式下的 workLoop，每次遍历执行 performUnitOfWork 前会先判断 shouYield 的值

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}

// packages\scheduler\src\SchedulerPostTask.js
export function unstable_shouldYield() {
  return getCurrentTime() >= deadline
}
```
getCurrentTime 获取的是当前的时间戳，deadline 上面讲到了是浏览器每一帧结束的时间戳。也就是说 concurrent 模式下，react 会将这些非同步任务放到浏览器每一帧空闲时间段去执行，若每一帧结束未执行完，则中断当前任务，待到浏览器下一帧的空闲再继续执行。
