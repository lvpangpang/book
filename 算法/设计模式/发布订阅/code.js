class PubSub {
  constructor() {
    this.arr = {}
  }
  sub(event, callBack) {
    if (!this.arr[event]) {
      this.arr[event] = []
    }
    this.arr[event].push(callBack)
  }
  pub(event, ...args) {
    const events = this.arr[event]
    if (events && events.length) {
      events.forEach((item) => {
        item.call(this, ...args)
      })
    }
  }
}

const sub1 = new PubSub()
function a() {
  setTimeout(() => {
    console.log('1')
    sub1.pub('2', '哈哈')
  }, 1000)
}

sub1.sub('2', () => {
  console.log(arguments)
  console.log('2')
  sub1.pub('3')
})

sub1.sub('3', () => {
  console.log('3')
})

a()