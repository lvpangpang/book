function red() {
  console.log('红灯')
}

function green() {
  console.log('绿灯')
}

function yellow() {
  console.log('黄灯')
}

function light(timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}

const step = function() {
  light(1000, red).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(3000, yellow)
  }).then(() => {
    console.log('-------------')
    return step()
  })
}

step()