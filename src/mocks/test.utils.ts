import { RequestHandler } from 'msw'
import { server } from './server'
import { authRefreshErrorHandler, userInfoErrorHandler } from './handlers'

export const mockRequests = ({
  handlers = [],
  loggedInUser = true,
}: {
  handlers?: Array<RequestHandler>
  loggedInUser?: boolean
}) => {
  if (!loggedInUser) {
    handlers.push(userInfoErrorHandler)
    handlers.push(authRefreshErrorHandler)
  }
  if (handlers.length) {
    server.use(...handlers)
  }
}
