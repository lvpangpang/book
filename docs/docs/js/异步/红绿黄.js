// 题目：第1秒红灯亮，第2秒黄灯亮，第3秒蓝灯亮；如何让三个灯不断交替重复亮灯？（用Promise实现）
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

function step() {
  light(1000, red)
    .then(() => {
      return light(1000, green)
    })
    .then(() => {
      return light(1000, yellow)
    })
    .then(() => {
      console.log('--------')
      return step()
    })
}

step()
