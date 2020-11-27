### React
- [ ] 重要API
  - [ ] setState
  - [ ] createRef
- [ ] 虚拟DOM
- [ ] 合成事件
- [ ] React Fiber
- [ ] Hooks思想
- [ ] useState，useEffect实现
- [X] 状态管理（redux，mobx）


### 核心思想
内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟DOM，得到一颗新树，然后diff新老虚拟DOM树，找到有变化的部分，得到一个change(patch)，将这个patch加入队列，最终批量更新这些path到DOM中。 简单说就是： diff + patch 。