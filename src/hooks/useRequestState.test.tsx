import { act, renderHook } from '@testing-library/react'
import { useRequestState } from './useRequestState'

describe('useRequestState', () => {
  it('updates state', () => {
    const { result } = renderHook(() => useRequestState())

    expect(result.current.requestState).toBe('init')
    act(() => {
      result.current.setRequestState('loading')
    })

    expect(result.current.requestState).toBe('loading')
  })
})
