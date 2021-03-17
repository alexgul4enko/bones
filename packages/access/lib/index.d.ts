declare module '@cranium/access' {
  import { FC, ReactNode } from 'react'
  interface CheckAccessProps = {
      level: string | Array<string>
      fallback?: ReactNode
  }
  export const composeAccess = <R>(
      fn1: (...args: any[]):string,
      ...fns: Array<(a: R) => R>
  )
  export const AccessProvider:FC<any>
  export const CheckAccess:FC<CheckAccessProps, any>
  export function hasPermission(params:string|string[]):boolean
  export function usePermissions():Set<string>
}