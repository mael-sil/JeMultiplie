import { vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    ...vueTsConfigs.recommended,
    ...pluginVue.configs['flat/essential'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
]
