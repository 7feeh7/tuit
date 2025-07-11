module.exports = [
  {
    files: ['src/**/*.{ts,js}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'quote-props': ['error', 'as-needed'],
      'max-len': ['error', { code: 83 }],
      indent: ['error', 2],
    },
  },
]
