import { converToFormData } from './converToFormData';
import { Method } from '../types';
/*
 * function to prepare API body.
 * it should conver data to FormData
 * it should return undefined for GET requests
 * it should not transform data for non JSON or FORM-DATA requests
 * it should stringify data for application/json requests
 */
export function prepareBody(
  body: any,
  isMultipartFormData: boolean,
  method?: Method,
  contentType?: string | null
): FormData | string | undefined {
  if (method === 'GET') {
    // GET Requests does not has body
    return undefined;
  }
  if (body instanceof FormData) {
    return body;
  }
  // if it is not application/json or form data => do not modify body
  if (contentType && !['application/json', 'form-data'].find((item: string) => item.includes(contentType))) {
    return body;
  }
  if (isMultipartFormData) {
    return converToFormData(new FormData(), body);
  }

  return JSON.stringify(body);
}
