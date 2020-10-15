import PropTypes from 'prop-types'
import { createContext, useMemo, useContext } from 'react'

export const F_PUBLIC = undefined

const AcessContext = createContext('access')


AccessProvider.propTypes = {
  children: PropTypes.node.isRequired,
  acessLevels: PropTypes.func.isRequired,
}

export function AccessProvider({ children, acessLevels, ...props }) {
  const permissions = useMemo(() => acessLevels(props), [acessLevels, props])
  return (
    <AcessContext.Provider value={permissions}>
      {children}
    </AcessContext.Provider>
  )
}


export function composeAccess() {
  const calculateLeveles = [...arguments]
  return function(props) {
    return new Set(calculateLeveles.map(rule => rule(props)).filter(Boolean))
  }
}

export function usePermissions() {
  return useContext(AcessContext)
}

export function hasPermission(levels) {
  if(!levels) { return true }
  const userPermissions = useContext(AcessContext)
  return useMemo(() => {
    if(Array.isArray(levels)) {
      return levels.some(level => userPermissions.has(level))
    }
    return userPermissions.has(levels)
  }, [userPermissions, levels])
}


export function CheckAccess({ level, fallback = null, children }) {
  return hasPermission(level) ? children : fallback
}
