---
id: cache_about
title: Cache
sidebar_label: Cache
---
Module to save data on client-side:

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## Save data

To save data use `CacheModule.put` method.

```js
CacheModule.put(config, dataToSave)
```

### Save to localStorage


You can use the `storage` configuration to configure browser storage to use
```js {4}
import { CacheModule } from '@cranium/cache';

CacheModule.put({
    storage: localStorage,
    key: 'test'
}, {x: 'data to cache'})
```

### Save to sessionStorage

```js {4}
import { CacheModule } from '@cranium/cache';

CacheModule.put({
    storage: sessionStorage,
    key: 'test'
}, {x: 'data to cache'})
```

### Save to your own Storage

```ts {22}
import { CacheModule } from '@cranium/cache';


class MyStorage {
  private store = {};
  public getItem(key: string) {
    return this.store[key];
  }

  public setItem(key: string, item: any) {
    this.store[key] = item;
  }

  public removeItem(key: string) {
    delete this.store[key];
  }
}

const storage = new MyStorage();

CacheModule.put({
    storage: storage,
    key: 'test'
}, {x: 'data to cache'})
```

### Define static string storage key

You can use the `key` configuration as a string to configure static storage key

```js {5}
import { CacheModule } from '@cranium/cache';

CacheModule.put({
    storage: sessionStorage,
    key: 'test'
}, {x: 'data to cache'})
```

```markup title="sessionStorage"
test='{"x":"data to cache"}'
```

### Build dynamic storage key

You can pass a custom function as a `key` configuration to build a storage key based on global Data.

```ts {3-5,9}
import { CacheModule, CacheGlobalData } from '@cranium/cache';

function key(extra_arg) {
    return ['my-key', extra_arg].filter(Boolean).join('_')
}

CacheModule.put({
        storage: 'sessionStorage',
        key: key
    }, 
    { x: 'data to cache' }, 
    'extar argument'
)
```

## Clear data

You can use the `CacheModule.put` method to clear data. To do that pass null as a second argument

```js {7}
import { CacheModule } from '@cranium/cache';

CacheModule.put({
        storage: 'sessionStorage',
        key: 'test'
    },
    null
)
```

## Get cached data

You can use the `CacheModule.get` method to get data from storage.

```js {3-6}
import { CacheModule } from '@cranium/cache';

CacheModule.get({
    storage: 'sessionStorage',
    key: 'test'
})
```

```js {3-5,9}
import { CacheModule } from '@cranium/cache';

function key(extra_arg) {
    return ['my-key', extra_arg].filter(Boolean).join('_')
}

CacheModule.get({
        storage: 'sessionStorage',
        key: key
    }, 
    'extar argument'
)
```