import { CacheConfig, CacheKeyType, StorageType } from './types';

/*
 * Module to cache data to browser localStorage or sessionStorage
 * keyDataInterceptors
 * public instance of Interceptors
 * this will give ability to add some extra data for key generation function
 * getCache
 * method to return cached data from storage
 * setCache
 * method to write data to storage
 */
class Cache {
  public keyDataInterceptors;

  private getStorageKey(...args: (CacheKeyType | unknown)[]) {
    const cacheKey = args[0];
    if (typeof cacheKey === 'function') {
      return cacheKey([...args.slice(1)]) as string;
    }
    if (typeof cacheKey === 'string') {
      return cacheKey;
    }
    return null;
  }

  /*
   * method to get cached data from storage
   * @param {CacheConfig}   configs cache configuration
   * what ever else params that will be pased to key generation function
   */
  public get<CacheDataType>(configs: CacheConfig, ...args: unknown[]) {
    const storage = configs.storage || window.localStorage;
    const key = this.getStorageKey(...[configs.key, ...args]);
    if (key) {
      const data = storage.getItem(key);
      if (!data) return null;
      let parsedData: CacheDataType | string | null | number = null;
      try {
        parsedData = JSON.parse(data);
      } catch {
        parsedData = data;
      }
      return parsedData;
    }
    return null;
  }

  /*
   * method to write data to storage
   * @param {CacheConfig}   configs cache configuration
   * @param {any}           data    data to save
   * what ever else params that will be pased to key generation function
   * this method will remove cached data if there is no data to cache
   */
  public put(configs: CacheConfig, data: unknown | null | undefined, ...args: unknown[]) {
    const storage = configs.storage || window.localStorage;
    const key = this.getStorageKey(...[configs.key, ...args]);
    if (key) {
      if (data) {
        try {
          storage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
        } catch (err) {
          console.error(err);
        }
      } else {
        return storage.removeItem(key);
      }
    }
  }
}

export const CacheModule = new Cache();
