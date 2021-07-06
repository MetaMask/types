module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
    {
      files: ['*.js'],
      env: {
        commonjs: true,
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', '!.prettierrc.js'],
};
