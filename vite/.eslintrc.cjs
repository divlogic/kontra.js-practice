module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
    ],
    'overrides': [
        {
            'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
            'extends': 'standard-with-typescript',
            'parserOptions': {
              'project': './tsconfig.json'
            }
          }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json',
        'tsconfigRootDir': __dirname
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/strict-boolean-expressions': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            "checksVoidReturn": false
          }
        ],
        'object-property-newline': 'warn',
        'object-curly-newline': ['warn', 'always'],
        'max-len': ['warn'],
    }
};
