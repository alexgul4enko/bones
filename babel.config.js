module.exports = {
  compact: false,
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ]
    // '@babel/preset-flow',
  ],
  plugins: [
    'babel-plugin-replace-ts-export-assignment',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-export-namespace-from',
    [
      'babel-plugin-jsx-remove-data-test-id',
      {
        attributes: ['data-cy']
      }
    ]
  ]
};
