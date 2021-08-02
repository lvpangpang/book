## lerna

1. 存在的问题

> module-1是依赖module-2的。如果module-2有修改，需要发布。那么你的工作有这些。
> 修改module-2版本号，发布。
> 修改module-1的依赖关系，修改module-1的版本号，发布。


2. 解决的问题

> 自动解决packages之间的依赖关系
> 通过git 检测文件改动，自动发布
> 根据git 提交记录，自动生成CHANGELOG