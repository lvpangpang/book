#### nginx

##### Location 
```
location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
```

```
= 表示精确匹配。只有请求的url路径与后面的字符串完全相等时，才会命中。
~ 表示该规则是使用正则定义的，区分大小写。
~* 表示该规则是使用正则定义的，不区分大小写。
^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。
```

##### try_files

````
语法规则：
格式1：try_files file ... uri;  格式2：try_files file ... =code;
可应用的上下文：server，location段
````

````
1：按指定的file顺序查找存在的文件，并使用第一个找到的文件进行请求处理
2：查找路径是按照给定的root或alias为根路径来查找的(易错点)
3：如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配
4：如果是格式2，如果最后一个参数是 = 404 ，若给出的file都没有匹配到，则最后返回404的响应码
````

````
location /images/ {
  root /opt/html/;
  try_files $uri   $uri/  /images/default.gif; 
}
比如 请求 127.0.0.1/images/test.gif 会依次查找 
  1.文件/opt/html/images/test.gif   
  2.文件夹 /opt/html/images/test.gif/下的index文件  
  3. 请求127.0.0.1/images/default.gif
````

````
location /childhood/ {
  alias /root/web/childhood/client/;
  try_files $uri / /index.html;
}
比如 请求 127.0.0.1/childhood/details 会依次查找 
  1.文件/root/web/childhood/client/childhood/details
  2.文件夹/root/web/childhood/client/childhood/details/下面的index文件
  3.请求127.0.0.1/childhood/index.html(这是一个新请求)
````
