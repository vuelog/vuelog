module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ["*/dist/**/*"],
  overrides: [
    {
      files: [
        './**/*.{ts,tsx,vue}'
      ],
      extends: [
        '@vue/typescript/recommended'
      ],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off'
      }
      // parser: '@typescript-eslint/parser'
    }
  ],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off'
  }
}
