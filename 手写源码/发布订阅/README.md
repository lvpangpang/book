# 发布订阅

## 1 概念

发布—订阅模式定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

## 2 应用场景

1. DOM 事件绑定
2. 广泛应用于异步编程，这是一种替代传递回调函数的方案
3. 可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。

## 3 简单实现

```js
class EventEmitter {
  constructor() {
    this.list = {}
  }
  on(event, fn) {
    if (!this.list[event]) {
      this.list[event] = []
    }
    this.list[event].push(fn)
  }
  off(event, fn) {
    const events = this.list[event]
    if (events) {
      this.list[event] = events.filter((item) => {
        return item !== fn
      })
    }
  }
  emit(event, ...args) {
    const events = this.list[event]
    if (events) {
      // 必须用箭头函数才能保证执行event时this指向对象本身而不是window
      events.forEach((item) => {
        item.call(this, ...args)
      })
    }
  }
}
```

## 4 观察者和发布订阅区别

观察者模式：观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

差异：

在观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。
