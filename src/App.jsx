import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Deposito from "./components/Deposito";
import Transferencia from "./components/Transferencia";
import TransferenciaLayout from "./components/Transferencia/TransferenciaLayout";
import NuevoDestino from "./components/Transferencia/NuevoDestino";
import ConfirmarDestino from "./components/Transferencia/ConfirmarDestino";
import EnviarDinero from "./components/Transferencia/EnviarDinero";
import Perfil from "./components/Perfil";
import SimularPlazoFijo from "./components/SimularPlazoFijo";
import Page from "./UI/Page";
import Inicio from "./components/Inicio";
import Home from "./components/Home";
import Pago from "./components/Pago";
import Account from "./components/Account";
import CrearPlazoFijo from "./components/PlazoFijo";
import Inversiones from "./components/Inversiones";
import AllAccounts from "./components/Account/AllAccounts";
import Register from "./components/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import EditarPerfil from "./components/EditarPerfil";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );
  const confirmedDestination = useSelector(
    (state) => state.transfer.confirmedDestination
  );

  const ProtectedRoute = ({ children, condition, redirectTo }) => {
    return condition ? children : <Navigate to={redirectTo} />;
  };

  useEffect(() => {
    if (!token && window.location.pathname !== "/register") {
      navigate("/");
    } else if ((token && window.location.pathname === "/register")) {
      navigate("/home")
    }
  }, [token]);

  return (
    <Page>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deposito" element={<Deposito />} />
        <Route path="/transferencia" element={<TransferenciaLayout />}>
          <Route index element={<Transferencia />} />
          <Route path="nuevo-destino" element={<NuevoDestino />} />
          <Route
            path="confirmar-destino"
            element={
              <ProtectedRoute
                condition={selectedDestination}
                redirectTo="/"
              >
                <ConfirmarDestino />
              </ProtectedRoute>
            }
          />
          <Route
            path="enviar-dinero"
            element={
              <ProtectedRoute
                condition={confirmedDestination}
                redirectTo="/"
              >
                <EnviarDinero />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/simular-plazo-fijo" element={<SimularPlazoFijo />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/cargar-saldo" element={<Deposito />} />
        <Route path="/cargar-pago" element={<Pago />} />
        <Route path="/account" element={<Account />} />
        <Route path="/crear-plazo-fijo" element={<CrearPlazoFijo />} />
        <Route path="/plazos-fijos" element={<Inversiones />} />
        <Route path="/cuentas" element={<AllAccounts />} />
      </Routes>
    </Page>
  );
}

export default App;
