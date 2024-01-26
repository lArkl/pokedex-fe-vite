import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes/appRoutes'
import PokemonDetailPage from './pages/PokemonDetailPage'
import PokemonListPage from './pages/PokemonListPage'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import LoginPage from './pages/LoginPage'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import SignUpPage from './pages/SignUpPage'
import Toast from './components/Toast/Toast'
import AuthGuard from './pages/AuthGuard/AuthGuard'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient({ defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } } })

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
          <Route
            path={AppRoutes.PokemonList}
            element={
              <AuthGuard>
                <PokemonListPage />
              </AuthGuard>
            }
          />
          <Route
            path={AppRoutes.PokemonDetail}
            element={
              <AuthGuard>
                <PokemonDetailPage />
              </AuthGuard>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toast />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
