/*
 * function to merge meta objects
 */
export function mergeConfigs(a?: Record<string, any>, b?: Record<string, any>): Record<string, any> {
  return Object.assign({}, a || {}, b || {});
}
