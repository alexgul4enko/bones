import { useSelector } from 'react-redux';
import { makeResourceSelector } from './utils';
import { ResourceType } from '../resources/connect-resources';

/*
 * HOOK to connect resource store data
 */
export function useResourceData<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(namespace: string) {
  return useSelector<Record<string, unknown>, ResourceType<DataType, FilterType, ErrorType, OptionsType>>(
    makeResourceSelector(namespace)
  );
}
