import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { makeSimpleAction, setData, setFilters, setErrors, setLoading } from '../resources'


export function useSetData(namespace) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setData, useDispatch())
}


export function useSetFilters(namespace) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setFilters, useDispatch())
}

export function useSetErrors(namespace) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setErrors, useDispatch())
}

export function useSetLoading(namespace) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setLoading, useDispatch())
}
