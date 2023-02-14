# Http

## 1. Http

HTTP（HyperText Transfer Protocol：超文本传输协议）是一种用于分布式、协作式和超媒体信息系统的应用层协议。 简单来说就是一种发布和接收 HTML 页面的方法，被用于在 Web 浏览器和网站服务器之间传递信息

## 2. Https

HTTPS（Hypertext Transfer Protocol Secure：超文本传输安全协议）是一种透过计算机网络进行安全通信的传输协议。HTTPS 经由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包。HTTPS 开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。

### 2.1 Https 工作流程

1. 客户端发起 HTTPS 请求

2. 服务端生成私钥和公钥，并向客户端发送公钥

3. 客户端解析公钥后用公钥加密随机数 key，发送加密后的 key 给服务端

4. 服务端使用私钥解密信息获取 key，并把内容通过 key 进行对称加密，并传给客户端

5. 客户端用之前生成的 key 解密信息

## 3 Http 和 https 的区别

1. HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。
2. 使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用。证书颁发机构如：Symantec、Comodo、GoDaddy 和 GlobalSign 等。
3. HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS 除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。
4. http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
5. HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。
6. http 在 tcp 的 80 端口，https 在 tcp 的 443 端口

## 4. Tcp 三次握手

1. 第一次握手：客户端尝试连接服务器，向服务器发送 syn 包（同步序列编号 Synchronize Sequence Numbers），syn=j，客户端进入 SYN_SEND 状态等待服务器确认
2. 第二次握手：服务器接收客户端 syn 包并确认（ack=j+1），同时向客户端发送一个 SYN 包（syn=k），即 SYN+ACK 包，此时服务器进入 SYN_RECV 状态
3. 第三次握手：客户端收到服务器的 SYN+ACK 包，向服务器发送确认包 ACK(ack=k+1），此包发送完毕，客户端和服务器进入 ESTABLISHED 状态，完成三次握手

### 5. 输入一个 url 到页面渲染的过程

URL DNS TCP 渲染
1. 请求域名会被dns解析为ip地址发送给对应的服务器
2. 3次握手建立Tcp链接， 如果是https还需要再建立TLS链接
3. 服务器响应请求，发送资源给客户端
4. 浏览器解析并绘制页面
   