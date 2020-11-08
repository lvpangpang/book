### Promise

> 函数执行是一个“入栈/出栈”的过程。当我们在 A 函数里调用 B 函数的时候，JS 引擎就会先把 A 压到栈里，然后再把 B 压到栈里；B 运行结束后，出栈，然后继续执行 A；A 也运行完毕后，出栈，栈已清空，这次运行结束。

#### 异步回调传统做法的缺点
1. 嵌套层次很深，难以维护
2. 代码难以复用
3. 堆栈被破坏，无法正常检索，也无法正常使用 try/catch/throw
4. 多个异步计算同时进行，无法预期完成顺序，必须借助外层作用域的变量，有误操作风险

#### Tips
1. .resolve() .reject() 不会自动 return。
2. Promise 里必须 .resolve() .reject() throw err 才会改变状态，.then() 不需要。
3. resolve() 只会返回一个值，返回多个值请用数组或对象
4. 永远不要在 macrotask(setTimeout之类) 队列中抛出异常（throw Error），在 macrotask 级别回调中永远使用 reject。macrotask 队列脱离了运行上下文环境，异常无法被当前作用域捕获。不过 microtask 中抛出的异常可以被捕获，说明 microtask 队列并没有离开当前作用域。  
5. promise 内部的错误不会冒泡出来，而是被 promise 吃掉了，只有通过 promise.catch 才可以捕获
6. Promise的状态一经改变就不能再改变。(见3.1)
7. .then和.catch都会返回一个新的Promise。(上面的👆1.4证明了)
8. catch不管被连接到哪里，都能捕获上层未捕捉过的错误。(见3.2)
9. 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
10. Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
11. .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
12. .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
13. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。(见3.8)
14. .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
15. .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

#### 面试题
1. 以下代码执行结果  
```
new Promise((resolve, reject) => {
  setTimeout(() => {
    throw Error('macrotask 中的异常')
  }, 1000)
})
```
2. 封装一个请求处理函数
```
// 请求
export default function request(config) {
  const {
    isLoading=false,
    method='get',
    url,
    data,
    params,
    handleBusinessError=false,
    handleNetworkError=false
  } = config;
  // 参数处理
  if(params) {
    Object.keys(params).map((item) => {
      params[item] = !params[item] ? undefined : params[item]; 
    });
  }
  return new Promise((reslove, reject) => {
    if(isLoading) {
      Toast.loading('请求中...', 0);
    }
    axios({
      headers: {
        token: localStorage.getItem('token')
      },
      method,
      url: DOMAIN() + url,
      data,
      params,
      timeout: 10000
    }).then((data) => {
      const result = data.data;
      const { code } = result;
      // 正常业务
      if(code===200) {
        reslove(result.data);
        // 未登录
      } else if (code===999) {
        window.location.replace('#/login');
      } else {
        if(!handleBusinessError) {
          Toast.fail(result.msg || '未知错误');
        } else {
          reject(result);
        }
      }
    }).catch((err) => {
      if(!handleNetworkError) {
        Toast.fail('服务端异常，请稍后再试');
      } else {
        reject(err);
      }
    }).finally(() => {
      if(isLoading) {
        Toast.hide();
      }
    })
  });
}
```

