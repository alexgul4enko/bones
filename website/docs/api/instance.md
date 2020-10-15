---
id: api_instance
title: Creating an instance
sidebar_label: Instance
---

You can pass custom configs to new API instance.

## ~~API~~

```javascript
import { API } from '@cranium/api'
const api = new API(configs)
```

Where `configs` is Object with possible configurations:

|  Value                    |      Type             |
| ------------------------- | --------------------- |
|   baseURL                 | String                |
|   headers                 | Object                |
|   paramsSerializer        | function              |
|   isMultipartFormData     | fucntion              |


### ~~baseURL~~ 

String option that will set up a base url. 
This is not required option that will help you not to dublicate everywhere your REST API endpoint. So that if you specify 
baseURL as `/api/v1/` than you can easy send Requests to `users` that will be transpailed to `/api/v1/users`
:::caution

It is recommended to use relative url instead of absolute. That means that set up  baseURL as `https://my.domain.com/api/v1/` to not right config and it could be changed to `/api/v1/`

:::
:::tip

Here you can use `process.env.API_URL`

:::

### ~~headers~~

This option helps you to define global [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) as a JSON Object. For Example:

```javascript
import { API } from '@cranium/api'
const api = new API({
  headers: {
    'Accept-Language': 'en' 
  }
})
```

:::note

In most cases you should not be worry about `Content-Type`. This will be automatically added to all requests based on body and is multipart form data.

:::

### ~~paramsSerializer~~
Is function that will convert JSON to query string.
By default uses [queryParams.buildQueryParams](/frontend-docs/docs/queryParams/queryParams_about)

### ~~isMultipartFormData~~

This a function that takes body and should return Boolean to determinate if need to convert JSON to FormData.
This is not required config and in default implementation it will determinate FormData if you have [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object in body.

```javascript
function isMultipartFormData(body){
  //return Boolean
}
```
