import axios from "axios";
import { setDestinationAndConfirm, setSelectedDestination } from "../Redux/slice/transferSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Incluir cookies en las solicitudes
  credentials: "include",
  allowCredentials: true,
});

const API_BASE_URL = "http://localhost:8080/accounts";

const getAccountBalance = async () => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/balance`, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error("Usuario no autenticado");
    }
    console.log(error);
  }
};

const searchAccount = (value) => async (dispatch) => {
  const config = {
    params: { value },
  };

  try {
    const response = await apiClient.get("/accounts/search", config);
    dispatch(setSelectedDestination(response.data));
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al buscar la cuenta indicada");
    }
  }
};

const selectAccount = (value) => async (dispatch) => {
  const config = {
    params: { value },
  };

  try {
    const response = await apiClient.get("/accounts/search", config);
    dispatch(setDestinationAndConfirm(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al buscar la cuenta indicada");
    }
  }
};
const editAccountAlias = (idAccount, alias) => async () => { 
  console.log("ENTRO AL ACCOUNT JS ******************************************************************************")
  console.log("ID ACCOUND", idAccount);
  console.log("ALIAS", alias);
  try {
    const response = await apiClient.put(`/accounts/editAlias/${idAccount}`,  alias );
    // Aquí puedes despachar alguna acción si necesitas manejar el estado en Redux
    console.log('Alias updated successfully');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al editar el alias de la cuenta indicada");
    }
  }
};

export { getAccountBalance, searchAccount, selectAccount, editAccountAlias };

