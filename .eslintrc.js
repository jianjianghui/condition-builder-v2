module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2], // 设置缩进为2个空格
    'no-trailing-spaces': 'error', // 禁止尾部空格
    semi: ['error', 'never'], // 禁用分号
  }
}
