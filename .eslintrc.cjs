module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    './eslintrc-auto-import.json',
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'vue/multi-word-component-names': 0,
    // 处理 prettier 和 eslint 冲突的规则
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
        semi: true,
      },
    ],
  },
};
