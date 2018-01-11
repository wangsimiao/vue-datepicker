// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals : {
    '$': true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    'quotes': 0,
    'keyword-spacing': 0,
    'space-before-blocks': 0,
    'space-before-function-paren': 0,
    'wrap-iife': 0,
    'brace-style': 0,
    'no-new': 0,  // 类的实例必须有一个变量
    'comma-dangle': 0,  // 对象属性的最后一个逗号
    'no-trailing-spaces': 0,  // 空行包含空格
    "no-array-constructor": 0
  }
}
