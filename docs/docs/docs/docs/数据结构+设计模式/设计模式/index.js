const Observe = (function() {
  let _message = {};
  return {
    // 订阅
    on: function(type, fn) {
      if(!_message[type]) {
        _message[type] = [];
      }
      _message[type].push(fn);
    },

    // 发布
    subscribe: function(type, args) {
      const list = _message[type];
      if(!list) {
        return;
      }
      const len = list.length;
      for(let i=0; i<len; i++) {
        list[i].call(this, args)
      }
    }
  };
})() 


//订阅消息
Observe.on('say', function (data) {
  console.log(data.text);
})
Observe.on('success', function () {
  console.log('success')
});

//发布消息
Observe.subscribe('say', { text: 'hello world' })
Observe.subscribe('success');