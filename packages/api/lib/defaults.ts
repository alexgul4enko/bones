import { paramsSerializer } from './utils/paramsSerializer';
import { hasFile } from './utils/hasFile';
import { finalResponseIterceptor } from './utils/apiHelpers';
import { prepareBody } from './utils/prepareBody';
import { Interceptor } from './Interceptor';

export default {
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer,
  isMultipartFormData: hasFile,
  interceptors: {
    response: new Interceptor(finalResponseIterceptor),
    request: new Interceptor()
  },
  prepareBody
};
