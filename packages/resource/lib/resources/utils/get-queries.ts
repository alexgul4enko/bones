import { parse, Key } from 'path-to-regexp';
export function getQueries(
  endpoint: string,
  method?: 'POST' | 'GET',
  queries?: string[],
  filters?: { [key: string]: unknown }
) {
  const urlConfigs = new Set(
    (parse(endpoint) || []).filter((el: string | Key): el is Key => typeof el === 'object').map(({ name }) => name) ||
      []
  );
  if (method === 'POST') {
    return (queries || []).filter((item) => !urlConfigs.has(item));
  }
  const allQueries = Array.from(new Set([...(queries || []), ...Object.keys(filters || {})]));
  return allQueries.filter((item) => !urlConfigs.has(item));
}
