import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { makeClearAction } from '../resources'


export default function useClear(namespace) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeClearAction({ namespace }, useDispatch())
}
