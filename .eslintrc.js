module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
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
    "rules": {
        "@typescript-eslint/indent": ["error", 4],
        "indent": ["error", 4],
        "@typescript-eslint/array-type": ["error"],
    }
};
