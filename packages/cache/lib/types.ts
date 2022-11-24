export type CacheKeyFunctionType = (...args: any[]) => string;
export type CacheKeyType = CacheKeyFunctionType | string;

export type StorageType = {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
};

export interface CacheConfig {
  storage?: typeof localStorage | typeof sessionStorage | StorageType;
  key?: CacheKeyType;
  refresh?: boolean;
}
