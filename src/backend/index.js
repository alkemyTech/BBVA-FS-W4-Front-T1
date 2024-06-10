import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // Incluir cookies en las solicitudes
    credentials: 'include',
    allowCredentials: true,
  });

export const postLogin = async (email, password) => {
    try {
      const userLoginData = {
        email: email,
        password: password,
      };

      const response = await apiClient.post(
        '/auth/login',
        userLoginData
      );

      console.log(response.data)
      console.log(response.headers)
        // Extraer la cookie jwt-token de la respuesta y guardarla en el estado
        const token = response.headers['authorization'];
        console.log(token)
        console.log(token.split(' ')[1])

      return response.data;

    } catch (err) {
        console.log(err);
    }
}