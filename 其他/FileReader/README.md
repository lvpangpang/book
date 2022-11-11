# FileReader

## 1 Blob

Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成

```js
new Blob(blobParts, options)
```

1. blobParts 是 Blob/BufferSource/String 类型的值的数组。
2. options 可选对象：
   type —— Blob 类型，通常是 MIME 类型，例如 image/png，
   endings —— 是否转换换行符，使 Blob 对应于当前操作系统的换行符（\r\n 或 \n）。默认为 "transparent"（啥也不做），不过也可以是 "native"（转换）。
   自定义下载一个文件到本地

```js
let link = document.createElement('a')
link.download = 'hello.txt'
let blob = new Blob(['Hello, world!'], { type: 'text/plain' })
link.href = URL.createObjectURL(blob)
link.click()
URL.revokeObjectURL(link.href)
```

## 2 File

File 对象继承自 Blob，并扩展了与文件系统相关的功能。
有两种方式可以获取它。

1. 第一种，与 Blob 类似，有一个构造器：

```js
new File(fileParts, fileName, [options])
```

2. 第二种，更常见的是，我们从 <input type="file"> 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。
   ```js
   <input type="file" onchange="showFile(this)">
   function showFile(input) {
    let file = input.files[0];
   }
   ```

## 3 FileReader

FileReader 是一个对象，其唯一目的是从 Blob（因此也从 File）对象中读取数据。

```js
let reader = new FileReader() // 没有参数
```

主要方法:

1. readAsArrayBuffer(blob) —— 将数据读取为二进制格式的 ArrayBuffer。
2. readAsText(blob, [encoding]) —— 将数据读取为给定编码（默认为 utf-8 编码）的文本字符串。
3. readAsDataURL(blob) —— 读取二进制数据，并将其编码为 base64 的 data url。
4. abort() —— 取消操作。
