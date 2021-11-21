module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "project": "./tsconfig.json"
  },
  plugins: [
    '@typescript-eslint',
  ],
  "env": {
    "browser": true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
