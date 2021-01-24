## NPM
1. bin
它是一个命令名和本地文件名的映射。在安装时，如果是全局安装，npm将会使用符号链接把这些文件链接到prefix/bin，如果是本地安装，会链接到./node_modules/.bin/。
通俗点理解就是我们全局安装， 我们就可以在命令行中执行这个文件， 本地安装我们可以在当前工程目录的命令行中执行该文件。("scripts"里面)  

2. scripts 
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。    

3. 包版本依赖
^1.2.1 := >=1.2.1 <2.0.0(可以改变后2位)
~1.2.1 := >=1.2.1 <1.3.0(只能改变最后一位)

4. 环境入口
main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
browser : 定义 npm 包在 browser 环境下的入口文件