// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  s = s.split('')
  const res = {
    '(': -1,
    ')': 1,
    '{': -2,
    '}': 2,
    '[': -3,
    ']': 3,
  }
  const arr = []
  for (var i = 0; i < s.length; i++) {
    if (res[s[i]] < 0) {
      arr.push(res[s[i]])
    } else {
      const top = arr.pop()
      if (top + res[s[i]] !== 0) {
        return false
      }
    }
  }
  if (arr.length !== 0) {
    return false
  }

  return true
}
