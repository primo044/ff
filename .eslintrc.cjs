/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-for-template-key': 'off',
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@views', './src/views'],
          ['@stores', './src/stores'],
          ['@utils', './src/utils'],
          ['@assets', './src/assets'],
          ['@composables', './src/composables'],
          ['@plugins', './src/plugins'],
          ['@config', './src/config'],
          ['@api', './src/api'],
          ['@core', './src/@core'],
          ['@layouts', './src/@layouts']
        ],
        extensions: ['.js', '.json', '.vue']
      }
    }
  }
}
