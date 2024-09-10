import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../../components/Loader'
import useUserQuery from '../../hooks/useUserQuery'
import { AppRoutes } from '../../routes/appRoutes'

export const ProtectedRoute = () => {
  const { data, isFetching } = useUserQuery()
  if (isFetching) {
    return <Loader />
  }
  return data ? <Outlet /> : <Navigate to={AppRoutes.Login} />
}
