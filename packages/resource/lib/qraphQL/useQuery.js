import { useCustomRequest } from '../hooks/useRequest'
import request from './request'
import getConfigs from './getConfigs'


export default function useQuery(query, configs) {
  const requestConfig = getConfigs(query, configs)
  return useCustomRequest(request, requestConfig)
}
