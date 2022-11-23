import Qs from 'query-string';

/*
 * function to convert object to query string
 */
export function paramsSerializer(params: Record<string, any>): string {
  return Qs.stringify(params, { arrayFormat: 'comma', skipNull: true });
}
