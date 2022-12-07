# 发布订阅
## 1 概念
发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状
态发生改变时，所有依赖于它的对象都将得到通知。

## 2 应用场景
1. DOM事件绑定
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
      this.list[event] = this.list[event].filter((item) => {
        return item !== fn
      })
    }
  }
  emit(event, ...args) {
    const events = this.list[event]
    if (events) {
      events.forEach((item) => {
        item.call(this, ...args)
      })
    }
  }
}
```
