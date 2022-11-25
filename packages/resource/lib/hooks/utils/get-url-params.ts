import { match } from 'path-to-regexp';

export function getUrlParams(urlPatterns?: string | string[], pathname?: string): Record<string, unknown> {
  if (!urlPatterns) return {};
  const urls = Array.isArray(urlPatterns) ? urlPatterns : [urlPatterns];
  return urls.reduce((res, url) => {
    const mathParams = match(url, { decode: decodeURIComponent })(pathname || window.location.pathname);
    return {
      ...res,
      ...(typeof mathParams === 'boolean' ? {} : mathParams.params)
    };
  }, {});
}
