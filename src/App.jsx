import "./App.css";
import { Route, Routes } from "react-router";
import Deposito from "./components/Deposito";
import Transferencia from "./components/Transferencia";
import Perfil from "./components/Perfil";
import SimularPlazoFijo from "./components/SimularPlazoFijo";
import Login from "./components/Login";
import Page from "./UI/Page";
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Account from "./components/Account";

function App() {
  return (
      <Page>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/deposito" element={<Deposito />} />
          <Route path="/transferencia" element={<Transferencia />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/simular-plazo-fijo" element={<SimularPlazoFijo />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/cargar-saldo" element={<Deposito />} />
          <Route path="/account" element={<Account />} />
          
        </Routes>
      </Page>
  );
}

export default App;
