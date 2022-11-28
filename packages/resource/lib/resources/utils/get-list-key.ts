/*
 * function returns Object key that has Array value
 */
export function getListKey(data?: { [key: string]: unknown }): string | null {
  if (!data) {
    return null;
  }
  const entry = Object.entries(data).find(([, value]) => Array.isArray(value));
  if (entry) {
    return entry[0];
  }
  return null;
}
