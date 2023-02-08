# JSBridge

JSBridge 简单来讲，主要 App 提供给 JavaScript 调用的 功能的接口

## 1 实现原理

JavaScript 是运行在一个单独的 JS Context 中（例如，WebView 的 Webkit 引擎、JSCore）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。
在 JSBridge 的设计中，可以把前端看做 RPC 的客户端，把 Native 端看做 RPC 的服务器端，从而 JSBridge 要实现的主要逻辑就出现了：通信调用（Native 与 JS 通信） 和 句柄解析调用。（如果你是个前端，而且并不熟悉 RPC 的话，你也可以把这个流程类比成 JSONP 的流程）

## 2 通信原理

### 2.1 JavaScript 调用 Native

1. 注入 API
   注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

2. 拦截 URL SCHEME
   先解释一下 URL SCHEME：URL SCHEME 是一种类似于 url 的链接，是为了方便 app 直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。
   拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

### 2.2 Native 调用 JavaScript

Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上

## 3 实战

```js
//Android
function createCallback(fnName, resolve) {
  window[fnName] = function (res) {
    const jsonRes = JSON.parse(res)
    resolve(jsonRes.data)
  }
  return fnName
}

//IOS
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

// 使用
export function getBaseInfo() {
  return new Promise((resolve) => {
    if (BROWSER.Android) {
      skioBridge.nativeAppInfo(createCallback('skio_appInfo', resolve))
    } else {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('nativeAppInfo', (res) => {
          const jsonRes = JSON.parse(res)
          resolve(jsonRes.data)
        })
      })
    }
  })
}
```
