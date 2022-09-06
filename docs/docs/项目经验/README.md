# 项目经验

## 1. 自研微前端架构

1.1 项目背景  
公司一开始做自营司机端-蓝道出行，只有一个网约车管理系统，7 大模块，100 多个页面
后面业务发展，公司承接了许多品牌，比如飞嘀打车，量子出行等，需要讲之前的网约车管理系统扩展到客服系统，商户系统，平台管理系统 3 个独立域名的系统，这 3 个系统公用之前的网约车管理系统的 7 大模块，自己又有独立的模块，3 大系统独立的发布构建流程。服务端接口以及权限都是 3 套。

1.2 解决方案  
一开始是在一个系统写好，然后拷贝，重复测试一遍，浪费很多人力物力
后面基于文件式路由+webpack5.0 的联邦模块功能解决了这个问题，做到了维护 1 个基座项目，公共模块都在这里以及 3 个对外的子系统项目，公共模块功能在基座项目开发上线，子系统模块功能在 3 个子系统开发上线，相互不干扰

- 文件式路由
  不需要手动维护前端路由配置表，根据 src 里面的 pages 文件夹中的文件目录自动创建最新的路由表，约定动态路由[id]的格式
- 联邦模块
  基座项目对外暴露所有页面级别的路由组件
  子项目在构建的时候会先读取基座项目暴露的路由和自己本身的路由组合成最终的项目路由，同名路由子项目会覆盖基座项目

## 2. 基于 Antd3 封装业务组件

1.1 项目背景  
网约车管理系统在 19 年开始的，那时候只有 Antd3 版本，缺少很多方便的功能

1.2 解决方案  
继续用 antd3，然后在私有 npm（Verdaccio 搭建）创建了一个项目叫做 cf-components 的项目，对 antd3 的一些组件进行二次封装。

- Select 的全选功能

```js
// 全选操作
const checkAll = (e) => {
  if (e.target.checked) {
    const allValues = Children.map(child, (node) => {
      const { children: nodeLabel, value: nodeValue } = node.props
      return nodeValue
    })
    onChange(allValues)
  } else {
    onChange(undefined)
  }
}
```

- 列表页面搜索项 Form 和数据展示 Table 的封装

```js
function Index() {
  return (
    <View>
      <Search></Search>
      <List></List>
      <LogModal></LogModal>
    </View>
  )
}

$table = new TableStore({
  requestList: async (params) => {
    const { list, total } = await API.getList(params)
    return {
      list,
      total,
    }
  },
})
```

Search 组件封装了 antd3 的 Form 组件
调用Form的方法获取搜索信息对象
List 组件封装了 antd3 的 Table 组件
两者通过公共的 store 来关联，在 TableStore 里面实例化了 SearchBarStore，这样在 TableStore 中就可以获取到搜索条件了
点击搜索的时候，Form 组件获取到的搜索条件和 Table 组件的分页条件合并为最终的接口请求参数，
业务代码通过重写 store 的 requestList 方法发起请求
请求返回的结果设置到 Table 组件
