import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes/appRoutes'
import PokemonDetailPage from './pages/PokemonDetailPage'
import PokemonListPage from './pages/PokemonListPage'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={AppRoutes.PokemonList} element={<PokemonListPage />} />
        <Route path={AppRoutes.PokemonDetail} element={<PokemonDetailPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
