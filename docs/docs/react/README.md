# React

内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟DOM，得到一颗新树，然后diff新老虚拟DOM树，找到有变化的部分，得到一个change(patch)，将这个patch加入队列，最终批量更新这些path到DOM中。 简单说就是： diff + patch 。

* [虚拟DOM](/react/虚拟DOM/README.md)
* [Context](/react/Context/README.md)
* [Hooks](/react/Hooks/README.md)
* [状态管理](/react/状态管理/README.md)
* [路由](/react/路由/README.md)

