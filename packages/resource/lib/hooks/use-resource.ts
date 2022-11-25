import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeResourceSelector, useGetActions } from './utils';
import { ResourcesConfigType } from '../types';
import { ResourceType } from '../resources/connect-resources';

/*
 * HOOK to connect actions and store data for resource
 */
export function useResource<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  config: ResourcesConfigType
) {
  const resource = useSelector(makeResourceSelector(config));
  const actions = useGetActions(config);
  return useMemo<ResourceType<DataType, FilterType, ErrorType, OptionsType>>(
    () => ({ ...resource, ...actions }),
    [resource, config]
  );
}
