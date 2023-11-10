function configureProxy() {
  const ret = [
    // proxy API and other paths from env.PROXY
    makeProxyContext(JSON.parse(process.env.PROXY), process.env.PROXY_URL)
  ];

  // proxy templates
  ret.push(makeProxyContext(['/**', '!/u/**', '!/', '!/mfe-static/**', '/u/icon-font*'], process.env.BACKEND_URL));
  // setup monolith pages to load local remotes config
  ret.push({
    context: '/u/remotes.js',
    target: `http://${process.env.DEV_SERVER_HOST}:${process.env.DEV_SERVER_PORT}`,
    pathRewrite: { '^/u': '/mfe-static' }
  });
  return ret;
}

module.exports = configureProxy;

function makeProxyContext(paths, targetUrl) {
  const urlData = new URL(targetUrl);
  return {
    secure: false,
    logLevel: 'debug',
    hot: true,
    changeOrigin: true,
    headers: { host: urlData.host, referer: urlData.origin },
    auth: urlData.auth,
    target: urlData.protocol + '//' + urlData.host,
    router: makeRouter(urlData),
    context: paths,
    bypass: (req, res) => bypass(req, res, urlData),
    cookieDomainRewrite: '',
    onProxyRes
  };
}

function makeRouter(urlData) {
  return function router(req) {
    const MAIN_HOST = process.env.MAIN_HOST;
    const subdomain = MAIN_HOST && req.headers.host.includes(MAIN_HOST) ? req.headers.host.split(MAIN_HOST)[0] : '';

    const proxyUrl = urlData.protocol + '//' + subdomain + urlData.host;

    return proxyUrl;
  };
}

function bypass(req, res, urlData) {
  if (req.headers && req.headers.referer) {
    const url = new URL(req.headers.referer);
    url.host = urlData.host;
    url.protocol = urlData.protocol;
    url.port = '';
    req.headers.referer = url.href;
  }
}

function onProxyRes(proxyResponse) {
  /*
   * replace location header for Redirects (3xx) status codes to local dev server
   * in case some API responce returns redirect to BACKEND_URL or PROXY_URL we should change it to dev server,
   * whitch will proxy that url to devserver
   * common case: auth redirects
   */
  if (proxyResponse.statusCode > 300 && proxyResponse.statusCode < 400 && proxyResponse.headers.location) {
    const redirect = proxyResponse.headers.location
      .replace(process.env.BACKEND_URL, '')
      .replace(process.env.PROXY_URL, '')
      .replace(process.env.BACKEND_URL.replace('https://', 'http://'), '')
      .replace(process.env.PROXY_URL.replace('https://', 'http://'), '');
    proxyResponse.headers.location = redirect;
  }
  if (proxyResponse.headers['set-cookie']) {
    const cookies = proxyResponse.headers['set-cookie'].map((cookie) =>
      cookie.replace(/; secure/gi, '').replace(/SameSite=None/gi, 'SameSite=Lax')
    );
    proxyResponse.headers['set-cookie'] = cookies;
  }
}
