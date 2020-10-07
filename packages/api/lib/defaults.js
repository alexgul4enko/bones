import { QueryParams } from '@cranium/queryparams'
import { hasFile, finalResponseIterceptor } from './utils'
import prepareBody from './prepareBody'
import Interceptor from './Interceptor'

const QS = new QueryParams()

export default {
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: QS.buildQueryParams,
  isMultipartFormData: hasFile,
  interceptors: {
    response: new Interceptor(finalResponseIterceptor),
    request: new Interceptor(),
  },
  prepareBody,
}
