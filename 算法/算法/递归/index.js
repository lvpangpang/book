function str1(str) {
  if(str.length<=1) return str
  return str1(str.slice(1)) + str[0]
}

console.log(str1('abcdefg'))