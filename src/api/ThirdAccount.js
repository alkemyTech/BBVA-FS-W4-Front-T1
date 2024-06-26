import axios from "axios";

const API_BASE_URL = "http://localhost:8080/contacts";

const getThirdAccount = async () => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(`${API_BASE_URL}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al buscar la lista de contactos");
    }
  }
};

const addThirdAccount = async (thirdAccount) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}`, thirdAccount, config);
      return response.data;
    } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message || error.response.data);
        } else {
          throw new Error("Ha ocurrido un error al agregar la cuenta a tu lista de contactos");
        }
      }
  };

  const deleteThirdAccount = async (thirdAccount) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      console.log(thirdAccount);
      const response = await axios.delete(`${API_BASE_URL}/${thirdAccount}`, config);
      return response.data;
    } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message || error.response.data);
        } else {
          throw new Error("Ha ocurrido un error al eliminar la cuenta de tu lista de contactos");
        }
      }
  };

  const updateThirdAccount = async (thirdAccount) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await axios.put(`${API_BASE_URL}`, thirdAccount, config);
      return response.data;
    } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message || error.response.data);
        } else {
          throw new Error("Ha ocurrido un error al actualizar la cuenta de tu lista de contactos");
        }
      }
  };

export { getThirdAccount, addThirdAccount, deleteThirdAccount, updateThirdAccount };
