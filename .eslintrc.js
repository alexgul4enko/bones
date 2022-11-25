module.exports = {
  extends: ['standard', 'plugin:react/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      globalReturn: true
    }
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      version: '16.2',
      createClass: 'createClass'
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'none',
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 120,
        useTabs: false
      }
    ],
    'prefer-promise-reject-errors': ['off'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': ['off'],
    'react/jsx-uses-vars': ['error'],
    'react/display-name': ['off', { ignoreTranspilerName: true }]
  },
  overrides: [
    {
      files: ['cypress/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-hooks'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              // un-ban a type that's banned by default
              '{}': false
            },
            extendDefaults: true
          }
        ]
      }
    }
  ],
  globals: {
    Cypress: 'readonly',
    cy: 'readonly'
  }
};
