const merge = require('webpack-merge').merge;

function resolveExtensions(extensions) {
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
  };
}

function resolveModules(modules) {
  return {
    resolve: {
      modules: ['node_modules', 'packages']
    }
  };
}

function setMode(isDevelopment) {
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    target: 'web'
  };
}

function modulejs() {
  return {
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    }
  };
}

function react() {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: false,
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: {
                        version: 3,
                        proposals: true
                      }
                    }
                  ]
                ],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  '@babel/plugin-proposal-numeric-separator',
                  '@babel/plugin-syntax-dynamic-import',
                  ['@babel/plugin-proposal-class-properties', { loose: false }],
                  '@babel/plugin-proposal-json-strings',
                  '@babel/plugin-proposal-export-namespace-from',
                  'istanbul'
                ]
              }
            }
          ]
        }
      ]
    }
  };
}

function typescriptLoader(isDevelopment) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: {
                        version: 3,
                        proposals: true
                      }
                    }
                  ]
                ],
                plugins: [
                  'const-enum',
                  'babel-plugin-replace-ts-export-assignment',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  '@babel/plugin-syntax-dynamic-import',
                  ['@babel/plugin-proposal-class-properties', { loose: false }],
                  '@babel/plugin-proposal-json-strings',
                  '@babel/plugin-proposal-export-namespace-from',
                  'istanbul'
                ]
              }
            }
          ]
        }
      ]
    }
  };
}

function graphql() {
  return {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    }
  };
}

module.exports = merge([
  resolveExtensions(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.sass', '.scss']),
  resolveModules(),
  setMode(),
  modulejs(),
  react(),
  typescriptLoader(),
  graphql()
]);
