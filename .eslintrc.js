module.exports = {
  // https://eslint.org/docs/user-guide/configuring#using-configuration-files-1
  root: true,

  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    node: true,
    jest: true
  },

  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],

  rules: {
    '@typescript-eslint/no-empty-interface': 1,
    // https://github.com/typescript-eslint/typescript-eslint/issues/103
    '@typescript-eslint/no-parameter-properties': 0
  }
};
