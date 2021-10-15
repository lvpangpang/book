function str1(str) {
  if (str.length <= 1) return str
  return str1(str.slice(1)) + str[0]
}
console.log(str1('abcdefg'))

// 递归实例
function foo(i) {
  if (i == 4) {
    return
  }
  console.log('fb:' + i)
  foo(i + 1)
  console.log('fe:' + i)
}
foo(1)

// 伪代码：
foo(1) //一开始传了一个1进来
function foo(i) {
  if (i == 4) {
    return
  }
  console.log('fb:' + i) //第一行输出---fb:1
  //此时执行:foo(i + 1);
  function foo(i) {
    //i = i + 1 = 2
    if (i == 4) {
      return
    }
    console.log('fb:' + i) //第二行输出---fb:2
    function foo(i) {
      //i = i + 1 = 3
      if (i == 4) {
        return
      }
      console.log('fb:' + i) //第三行输出---fb:3
      console.log('fe:' + i) //第四行输出---fe:3
    }
    console.log('fe:' + i) //第五行输出---fe:2
  }
  //所以后面的console.log("fe:" + i);被推到嵌套函数foo(i + 1)的后面了
  console.log('fe:' + i) // 第六行输出---fe:1
}

function fn1() {
  return 'this is fn1'
}

function fn2() {
  fn3()
  return 'this is fn2'
}

function fn3() {
  let arr = ['apple', 'banana', 'orange']
  return arr.length
}

function fn() {
  fn1()
  fn2()
  console.log('All fn are done')
}
