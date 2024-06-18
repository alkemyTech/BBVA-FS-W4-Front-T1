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
import Pago from "./components/Pago";
import Account from "./components/Account";
import PlazoFijo from "./components/PlazoFijo";
import Inversiones from "./components/Inversiones";
import AllAccounts from "./components/Account/AllAccounts";
import Register from "./components/Register";

function App() {
  return (
      <Page>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/register" element={<Register />} />
          <Route path="/deposito" element={<Deposito />} />
          <Route path="/transferencia" element={<Transferencia />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/simular-plazo-fijo" element={<SimularPlazoFijo />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/cargar-saldo" element={<Deposito />} />
          <Route path="/cargar-pago" element={<Pago />} />
          <Route path="/account" element={<Account />} />
          <Route path="/plazo-fijo" element={<PlazoFijo />}/>
          <Route path="/inversiones" element={<Inversiones />} />
          <Route path="/cuentas" element={<AllAccounts />} />
        </Routes>
      </Page>
  );
}

export default App;
