module.exports = {
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
    '@babel/preset-flow',
  ],
  plugins: [
    // stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-numeric-separator',
    // stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-export-namespace-from',
  ],
}
