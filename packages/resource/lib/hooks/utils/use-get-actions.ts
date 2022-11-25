import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { makeResourceActions } from '../../resources/utils';
import get from 'lodash/get';
import { ResourcesConfigType } from '../../types';

export function useGetActions(config: ResourcesConfigType) {
  const dispatch = useDispatch();
  return useMemo(() => makeResourceActions(config, dispatch), [get(config, 'namespace', config), dispatch]);
}
