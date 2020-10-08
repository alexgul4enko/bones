---
id: queryParams_about
title: queryParams
sidebar_label: About
---

This is module that will create query string from Object and Object from query string.

## ~~Create new instance~~

```javascript
import { QueryParams } from '@cranium/queryParams'
const QS = new QueryParams()
```

Inctance of QueryParams will return Object with 2 methods:
- parseQueryParams
- buildQueryParams

### ~~buildQueryParams~~

Function that takes Object as an argument and returns query string. Support nesting objects and arrays.

```javascript
import { QueryParams } from '@cranium/queryParams'
const QS = new QueryParams()
QS.buildQueryParams({
  age: 12,
  user: 'benjamin_button'
}) => `?age=12&user=benjamin_button`
```
### ~~parseQueryParams~~

Function that takes query string as an argument and returns Object. Support nesting objects and arrays.

```javascript
import { QueryParams } from '@cranium/queryParams'
const QS = new QueryParams()
QS.parseQueryParams('?age=12&user=benjamin_button`')
/*
returns
  {
    age: '12',
    user: 'benjamin_button'
  }
*/
```