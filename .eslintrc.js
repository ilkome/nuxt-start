module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-throw-literal': 'off',
    'brace-style': [
      'error',
      'stroustrup', {
        allowSingleLine: true
      }
    ],
    curly: ['error', 'multi-line']
  }
}
