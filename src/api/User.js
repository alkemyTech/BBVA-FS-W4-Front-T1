import axios from "axios";
import { setUser } from "../Redux/slice/userSlice";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/users",
    withCredentials: true, // Incluir cookies en las solicitudes
    credentials: "include",
    allowCredentials: true,
  });

export const putUpdateUser = (idUser,
    firstName,
    lastName,
    birthDate,
    gender,
    documentNumber,) => async (dispatch) => {
    try {
      const userUpdateData = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        gender: gender,
        documentNumber: documentNumber,
      };
  
      const response = await apiClient.put(`/${idUser}`, userUpdateData);
  
      console.log("Response", response.data);
      dispatch(setUser(response.data));
  
      return response.data;
    } catch (err) {
        console.log
      if (err.response) {
        throw new Error(err.response.data.message || err.response.data);
      } else {
        throw new Error("Ha ocurrido un error al actualizar los datos del usuario");
      }
    }
  };