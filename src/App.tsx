import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PokemonDetail from './Pages/PokemonDetail'
import PokemonList from './Pages/PokemonList'
import { AppRoutes } from './routes/appRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<PokemonList />} />
        <Route path={AppRoutes.PokemonDetail} element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
