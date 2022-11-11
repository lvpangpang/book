# Set+Map

Set， Map 是新增的内置对象，和数组对象类似

## 1 Set

1. Set 对象是值的集合，但是和数组还是有区别的 。Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
2. 初始化参数可以为空或者是一个可以迭代的对象，比如数组

```js
new Set()
new Set(iterable)
let mySet = new Set()
mySet.add(1) // Set [1]
```

## 2 Map

1. Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。
2. 初始化参数可以为空或者是一个可以迭代的对象，比如数组

```js
new Map()
new Map(iterable)
```
