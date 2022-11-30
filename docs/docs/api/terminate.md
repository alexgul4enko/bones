---
id: api_terminate
title: Terminate requests
sidebar_label: Terminate requests
---

## AbortController
You can terminate pending requests using [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

```js
import { API } from '@cranium/api'

const controller = new AbortController();

API.get('users', { signal: controller.signal })
//terminate
controller.abort();
````

## `cancel` method

All API methods returns Promise with 1 external method - `cancel`

```js
import { API } from '@cranium/api'

const request = API.get('users')
request.cancel()
```
