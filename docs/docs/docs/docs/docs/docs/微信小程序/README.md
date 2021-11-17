# 微信小程序

## 1. 刘海屏适配
小程序里面默认是有顶部导航栏的，这时候最顶部是不需要自己特殊处理的
当我们设置自定义导航栏的时候
```javascript
navigationStyle: 'custom'
```
需要手动获取顶部状态栏的高度
```javascript
const statusBarHeight = Taro.getSystemInfoSync()['statusBarHeight']
```
和H5里面处理刘海屏一样，都是根据指定的API获取顶部状态栏高度，然后给View设置一个padding-Top即可