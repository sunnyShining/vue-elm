// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential', 'airbnb-base'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [0],
        'import/prefer-default-export': [0],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': [0],
        'indent': ['error', 4],
        'vue/html-indent': [2, 4],
        'vue/script-indent': [2, 4],
        'import/extensions': [0],
        'import/no-unresolved': [0],
        'import/no-named-as-default-member': [0],
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': [0],
        'import/no-duplicates': [0],
        'import/order': [0],
        'import/no-self-import': [0],
        'import/no-cycle': [0],
        'no-trailing-spaces': [0],
        'no-else-return': [0],
        'space-before-function-paren': ['error', 'always'],
        'eol-last': [0],
        'import/no-useless-path-segments': [0],
        'no-restricted-syntax': [0],
        'semi': ['error', 'always'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
