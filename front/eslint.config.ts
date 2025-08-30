import pluginVue from 'eslint-plugin-vue'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import parserTypescript from '@typescript-eslint/parser'
import parserVue from 'vue-eslint-parser'

export default [
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{ts,mts,tsx}'],
    languageOptions: {
      parser: parserTypescript,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
    },
    rules: {
      ...pluginTypescript.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypescript,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': pluginTypescript,
    },
    rules: {
      ...pluginVue.configs['flat/essential'].rules,
      ...pluginTypescript.configs.recommended.rules,
    },
  },
]
