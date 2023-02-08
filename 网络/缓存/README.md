# 缓存

## 1. 强缓存

Expires：过期时间，如果设置了时间，则浏览器会在设置的时间内直接读取缓存，不再请求
Cache-Control：当值设为 max-age=300 时，则代表在这个请求正确返回时间（浏览器也会记录下来）的 5 分钟内再次加载资源，就会命中强缓存。
cache-control：除了该字段外，还有下面几个比较常用的设置值：

```js
（1） max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；
（2） s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；
（3）public：指示响应可被任何缓存区缓存；
（4）private：只能针对个人用户，而不能被代理服务器缓存；
（5）no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到     请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误     以为是响应不被缓存。实际上Cache-Control:     no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。
（6）no-store：禁止一切缓存（这个才是响应不被缓存的意思）。
```

```js
cache-control 是 http1.1 的头字段，expires 是 http1.0 的头字段,如果 expires 和 cache-control 同时存在，cache-control 会覆盖 expires，建议两个都写。
```

## 2. 协商缓存

Last-Modifed/If-Modified-Since 和 Etag/If-None-Match 是分别成对出现的，呈一一对应关系

1. Etag/If-None-Match：
   1.1 Etag：
   Etag 是属于 HTTP 1.1 属性，它是由服务器（Apache 或者其他工具）生成返回给前端，用来帮助服务器控制 Web 端的缓存验证。
   Apache 中，ETag 的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行 Hash 后得到的。

   1.2 If-None-Match:
   当资源过期时，浏览器发现响应头里有 Etag,则再次像服务器请求时带上请求头 if-none-match(值是 Etag 的值)。服务器收到请求进行比对，决定返回 200 或 304

2. Last-Modifed/If-Modified-Since：
   2.1 Last-Modified：
   浏览器向服务器发送资源最后的修改时间

   2.2 If-Modified-Since：
   当资源过期时（浏览器判断 Cache-Control 标识的 max-age 过期），发现响应头具有 Last-Modified 声明，则再次向服务器请求时带上头 if-modified-since，表示请求时间。服务器收到请求后发现有 if-modified-since 则与被请求资源的最后修改时间进行对比（Last-Modified）,若最后修改时间较新（大），说明资源又被改过，则返回最新资源，HTTP 200 OK;若最后修改时间较旧（小），说明资源无新修改，响应 HTTP 304 走缓存。

```js
Last-Modifed/If-Modified-Since的时间精度是秒，而Etag可以更精确。
Etag优先级是高于Last-Modifed的，所以服务器会优先验证Etag
Last-Modifed/If-Modified-Since是http1.0的头字段
```

对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。
