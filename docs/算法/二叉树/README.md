# 二叉树

1. 结构示意

```json
{
  val: 1,
  left: {
    val: 2,
    left: {...}
    right: {...}
  },
  right: {
    val: 2,
    left: {...}
    right: {...}
  }
}
```

2. 二叉搜索树
  是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

3. 查找

```javascript
function search(root, n) {
  // 若 root 为空，查找失败，直接返回
  if (!root) {
    return
  }
  // 找到目标结点，输出结点对象
  if (root.val === n) {
    console.log('目标结点是：', root)
  } else if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    search(root.left, n)
  } else {
    // 当前结点数据域小于n，向右查找
    search(root.right, n)
  }
}
```

4. 插入新结点

```javascript
function insertIntoBST(root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if (!root) {
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n)
    return root
  }

  if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n)
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n)
  }

  // 返回插入后二叉搜索树的根结点
  return root
}
```

5. 反转二叉树

```javascript
var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const left = invertTree(root.left)
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};
```
