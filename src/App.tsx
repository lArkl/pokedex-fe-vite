import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PokemonDetailPage from './pages/PokemonDetailPage'
import PokemonListPage from './pages/PokemonListPage'
import { AppRoutes } from './routes/appRoutes'
import Loader from './components/Loader'
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path={AppRoutes.PokemonList} element={<PokemonListPage />} />
        <Route path={AppRoutes.PokemonDetail} element={<PokemonDetailPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
