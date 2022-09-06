// babel 代码转化示意

const babylon = require('babylon')
const { transformFromAst } = require('babel-core') 

const code = 'const a = 1'

const ast = babylon.parse(code, {
  sourceType: 'module'
})

console.log(ast)

const result = transformFromAst(ast, null, {
  presets: ['env']
})

console.log(result.code)