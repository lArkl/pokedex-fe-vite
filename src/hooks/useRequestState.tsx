import { useState } from 'react'

type RequestState = 'error' | 'loading' | 'success' | 'init'

export const useRequestState = () => {
  const [requestState, setRequestState] = useState<RequestState>('init')

  return {
    requestState,
    setRequestState,
  }
}
