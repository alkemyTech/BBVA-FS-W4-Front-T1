import axios from "axios";
import { setToken, setUser } from "../Redux/slice/userSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Incluir cookies en las solicitudes
  credentials: "include",
  allowCredentials: true,
});

export const postLogin = (email, password) => async (dispatch) => {
  try {
    const userLoginData = {
      email: email,
      password: password,
    };

    const response = await apiClient.post("/auth/login", userLoginData);

    console.log(response.data);
    console.log(response.headers);
    // Extraer la cookie jwt-token de la respuesta
    const token = response.headers["authorization"];
    console.log(token);
    console.log(token.split(" ")[1]);

    const tokenValue = response.headers["authorization"].split(" ")[1];

    dispatch(setUser(response.data));
    dispatch(setToken(tokenValue));

    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Email o contraseña inválidos");
    }
    console.log(err);
    throw err;
  }
};
