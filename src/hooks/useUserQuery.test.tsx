import { renderHook, waitFor } from '@testing-library/react'
import subject from './useUserQuery'
import { MemoryRouter } from 'react-router-dom'
import { TestProvider } from '../context/TestProvider'
import { makeUser } from '../mocks/factories/user'
import { mockRequests } from '../mocks/test.utils'
import { userInfoErrorHandler } from '../mocks/handlers'

describe('useUserQuery', () => {
  it('returns user info', async () => {
    mockRequests({ handlers: [userInfoErrorHandler] })

    const { result } = renderHook(() => subject(), {
      wrapper: (props) => (
        <TestProvider>
          <MemoryRouter initialEntries={['/test']}>{props.children}</MemoryRouter>
        </TestProvider>
      ),
    })

    expect(result.current.isFetching).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(makeUser())
  })
})
