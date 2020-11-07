let a = 2;
const promise1 = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(1);
    // throw Error('用户不存在')  // 错误写法
  }, 1000); 
});
promise1.then((data) => {
  console.log('第一个：' + data);
  return data;
}).then((data) => {
  console.log('第二个：' + data)
}).catch((error) => {
  console.log('异常处理：' + error);
}).finally(() => {
  console.log('最后');
});


const add = (k) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      if(k<10) {
        reslove(k+1)
      } else {
        reject('错误')
      }
    }, 500);
  })
};

async function main() {
  try {
    const res1 = await add(1);
    console.log('结果1：' + res1);
    const res2 = await add(res1); // 永远不会执行
    console.log('结果2：' + res2); // 永远不会执行
    const res3 = await add(res2); // 永远不会执行
    console.log('结果3：' + res3); // 永远不会执行
  } catch(err) {
    console.log(err);
  } finally {
    console.log('结束');
  }
}
main();

// 请求
export default function request(config) {
  const {
    isLoading=false,
    method='get',
    url,
    data,
    params,
    businessErrorHandle=()=>{},
    networkErrorHandle=()=>{}
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
        if(!businessErrorHandle) {
          Toast.fail(result.msg || '未知错误');
        } else {
          reject(result);
        }
      }
    }).catch((err) => {
      if(!networkErrorHandle) {
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