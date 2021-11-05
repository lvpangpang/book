# 缓存

## 类型

+ Service Worker
+ Memory Cache
+ Disk Cache
+ Push Cache
+ 网络请求-主要的类型

## 缓存策略

1. 强缓存
Expires 和 Cache-Control

2. 协商缓存
Last-Modified 和 ETag

对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。