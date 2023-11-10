const configureProxy = require('./proxy');
const makePath = require('../../utils/makePath');
const isDev = require('../../utils/isDev');
const path = require('path');

function devServer({
  static,
  publicPath = '/'
}) {
  if (!isDev()) {
    return {};
  }
  return {
    devServer: {
      port: process.env.DEV_SERVER_PORT || 3000,
      historyApiFallback: true,
      hot: true,
      host: process.env.DEV_SERVER_HOST,
      https: false,
      client: {
        overlay: false
      },
      static: static,
      devMiddleware: {
        publicPath: publicPath
      },
      watchFiles: [makePath(path.join(process.env.SOURCES_PATH, '/**'))],
      allowedHosts: ['.localhost', `.${process.env.MAIN_HOST}`],
      // remove proxy middleware while running tests
      proxy: process.env.CY ? undefined : configureProxy()
    }
  };
}

module.exports = devServer;
