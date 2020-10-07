---
id: api_terminate
title: Terminate requests
sidebar_label: Terminate requests
---

You can terminate pending requests using [AbortController](https://developer.mozilla.org/en-US/(/frontend-docs/docs//Web/API/AbortController).

```javascript
const controller = new AbortController()
const signal = controller.signal
api.get('users', { signal })
controller.abort()
```

:::note

By default Skeleton already has AbortController polyfill to support older browsers 

:::