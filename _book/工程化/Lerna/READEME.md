# lerna

1. 存在的问题

- module-1 是依赖 module-2 的。如果 module-2 有修改，需要发布。那么你的工作有这些。
- 修改 module-2 版本号，发布。
- 修改 module-1 的依赖关系，修改 module-1 的版本号，发布。

2. 解决的问题

- 自动解决 packages 之间的依赖关系
- 通过 git 检测文件改动，自动发布
- 根据 git 提交记录，自动生成 CHANGELOG
