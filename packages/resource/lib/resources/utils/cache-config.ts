import { CacheConfig } from '@cranium/cache';

export function makeCacheConfig(namespace: string, config?: CacheConfig) {
  if (!config) {
    return null;
  }
  if (config?.key) {
    return config;
  }
  return {
    ...config,
    key: namespace
  };
}
