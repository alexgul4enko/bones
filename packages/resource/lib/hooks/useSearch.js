import { useMemo, useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import requestStatus from './utils/requestStatus'


export default function useSearch(request, timeout = 200) {
  const cancelRequest = useMemo(() => new requestStatus(), [])
  const debouncedRequest = useMemo(() => debounce(request, timeout), [request])
  const handleClick = useCallback((...args) => {
    cancelRequest.cancel()
    cancelRequest.setRequest(debouncedRequest(...args))
  }, [debouncedRequest])
  useEffect(() => cancelRequest.cancel, [])
  return handleClick
}
