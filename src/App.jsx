import './App.css'
import { Route, Routes } from 'react-router'
import Deposito from './components/Deposito'
import Transferencia from './components/Transferencia'
import Perfil from './components/Perfil'
import SimularPlazoFijo from './components/SimularPlazoFijo'
import Login from './components/Login'
import Page from './UI/Page'
import Inicio from './components/Inicio'

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/deposito" element={<Deposito />} />
        <Route path="/transferencia" element={<Transferencia />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/simular-plazo-fijo" element={<SimularPlazoFijo />} />
        <Route path="/inicio" element={<Inicio/>} />
      </Routes>
    </Page>
  )
}

export default App
