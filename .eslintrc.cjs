module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      { singleQuote: true, trailingComma: 'none', endOfLine: 'auto' }
    ],
    'vue/multi-word-component-names': 0
  }
};
