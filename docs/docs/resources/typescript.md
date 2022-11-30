---
id: resource_ts
title: TypeScript
sidebar_label: TypeScript
---

## Hooks 

Types declarations for Resources hooks:

### useResource
```jsx
import { useResource } from '@cranium/resource'

type User = {
    id: string,
    name: string
}

type UserDataType = User[]

type UserErrorType = {
    message: string
}

type UserFilterType = {
    offset: string | number
    limit: string | number
}

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource<UserDataType, UserErrorType, UserFilterType>('users')
  
}
```

### useResourceData
```jsx
import { useResourceData } from '@cranium/resource'
import { UserDataType, UserErrorType, UserErrorType, UserFilterType } from './types'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResourceData<UserDataType, UserErrorType, UserFilterType>('users')
}
```

### usePrefetchRequest
```jsx
import { usePrefetchRequest } from '@cranium/resource'
import { API } from '@cranium/api'
import { UserDataType, UserErrorType, UserErrorType, UserFilterType } from './types'

function tryAsync(api:typeof API) {
  return api.get('/users')
}

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = usePrefetchRequest<UserDataType, UserErrorType, UserFilterType>('users')
}
```

### useCustomRequest
```jsx
import { useCustomRequest } from '@cranium/resource'
import { API } from '@cranium/api'
import { UserDataType, UserErrorType, UserErrorType, UserFilterType } from './types'

function tryAsync(api:typeof API) {
  return api.get('/users')
}

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useCustomRequest<UserDataType, UserErrorType, UserFilterType>('users')
}
```

### usePrefetchResource
```jsx
import { usePrefetchResource } from '@cranium/resource'
import { UserDataType, UserErrorType, UserErrorType, UserFilterType } from './types'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = usePrefetchResource<UserDataType, UserErrorType, UserFilterType>('users')
}
```


## ResourceType

React  `Resource` property type

```
import { ResourceType } from '@cranium/resource';

interface IProps {
    users: ResourceType<DataType, FiltersType, ErrorType, OptionsType>
}
export const MyComponent:FC<IProps> = (props)=> (<ChildComponent {...props}/>)
```



