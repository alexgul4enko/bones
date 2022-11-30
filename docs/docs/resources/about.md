---
id: resources
title: About
sidebar_label: About
---

## Main concept

Resources is global state management module. This module includes

1. Global state management
2. API to send HTTP request and store data in Redux without writing own actions and reducers
3. API to change store data without writing own actions and reducers
4. Cache and persist data from localstorage
5. GraphQL support
6. HOC's to work with Forms.
7. HOC's to work with Infinity lists
8. HOK's and Hooks to send HTTP requests on component mount.
9. Common logic to abort pending HTTP requests on component unmount
10. API to implement different scenarios while sending HTTP requests.

Why do we need this module:

1. Standardized state management
2. Write less code
```js
import { usePrefetchResource } from '@cranium/resource'

export function MyComponent() {
    // GET /users on component mount, and automatically abort request on unmount
    const { data, errors, isLoading, fetch, clear } = usePrefetchResource('users')
}
```
3. 1 module to send REST and GraphQL requests
4. Easy to debug with redux devtools
5. Use all power of Redux without writing any actions and reducers
6. Share data across components
7. There are a lot of different HOCs/Hooks that implements most common tasks. That will give you more time to focus on UI/UX.

## Usage

```jsx
import { ResourcesProvider } from '@cranium/resource';

const MyApp() {
    <ResourcesProvider>
        ...
    </ResourcesProvider>
}
```

### Define Api module


```jsx
import { ResourcesProvider } from '@cranium/resource';
import { API } from '@cranium/api'

const api = new API({
    baseURL: '/api/v2/',
})

const MyApp() {
    <ResourcesProvider api={api}>
        ...
    </ResourcesProvider>
}
```


### Define 401/403 Global handlers


```jsx
import { ResourcesProvider } from '@cranium/resource';
import { API } from '@cranium/api'

const api = new API({
    baseURL: '/api/v2/',
})

const MyApp() {
    <ResourcesProvider api={api}>
        <SessionHandler>
            ...
        </SessionHandler>
    </ResourcesProvider>
}

function SessionHandler() {
    const clearAll = useClearAll(); 
    useEffect(()=>{
        /*
         * add interceptor to handle 401 response and clear user info
         */
        return api.interceptors.response.use({
            onError(error: any) {
                if (get(error, 'status') === 401) {
                    //clear local session data
                    setSession({});
                    //clear Resources in-memory data
                    clearAll()
                }
                return Promise.reject(error);
            }
        });
    },[])
}

```

:::tip
For access managment you can use `@cranium/access` module ;)
:::