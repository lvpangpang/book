# 递归

1. 翻转字符串

```js
function reseveStr(str) {
  const len = str.length
  if (len === 1) {
    return str
  }
  return reseveStr(str.slice(1)) + str[0]
}
```

2. 判断是否为回文字符串

```js
function compareStr(str) {
  const len = str.length
  if (len === 1) {
    return true
  }
  if (len === 2) {
    return str[0] === srt[1]
  }
  if (str[0] === str[len - 1]) {
    return compareStr(1, -1)
  }
  return false
}
```

3. 计算总工资

```js
// 递归遍历
let company = {
  // 是同一个对象，简洁起见被压缩了
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'Alice', salary: 1600 },
  ],
  development: {
    sites: [
      { name: 'Peter', salary: 2000 },
      { name: 'Alex', salary: 1800 },
    ],
    internals: [{ name: 'Jack', salary: 1300 }],
  },
}

function calSalart(company) {
  let result = 0
  for (let item of Object.values(company)) {
    if (Array.isArray(item)) {
      result += item.reduce((prev, current) => {
        return prev + current.salary
      }, 0)
    } else {
      result += calSalart(item)
    }
  }

  return result
}

console.log(calSalart(company))
```

4. 编写一个函数 sumTo(n) 计算 1 + 2 + ... + n 的和。

```js
function sumTo(n) {
  // 执行单元
  if (n === 1) {
    return n
  }
  let result = 0
  // 调用执行单元
  result = n + sumTo(n - 1)
  return result
}
console.log(sumTo(4))
```

5. React-菜单组件

```js
function loopMenu(config) {
  const result = config.map((item) => {
    const { children, title, path, id } = item
    // 执行单位
    if (!children) {
      return <Menu.Item key={path}>{title}</Menu.Item>
    }
    // 调用执行单元
    return (
      <Menu.SubMenu
        title={
          <span>
            <Icon type="folder" />
            <span>{title}</span>
          </span>
        }
        key={`${id}`}
      >
        {loopMenu(children)}
      </Menu.SubMenu>
    )
  })
  return result
}
```
