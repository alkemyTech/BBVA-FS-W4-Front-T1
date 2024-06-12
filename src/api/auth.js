import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Incluir cookies en las solicitudes
  credentials: "include",
  allowCredentials: true,
});

export const postLogin = async (email, password) => {
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

    localStorage.setItem("userData", JSON.stringify(response.data));
    localStorage.setItem("token", response.headers["authorization"].split(" ")[1]);

    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Email o contraseña inválidos");
    }
    // TODO: Snackbar de error
    console.log(err);
    throw err;
  }
};
