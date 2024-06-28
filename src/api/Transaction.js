import axios from "axios";
import { useSelector } from "react-redux";
const API_BASE_URL = "http://localhost:8080/transactions";

const deposit = async (depositData) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/deposit`,
      depositData,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTransactionsByIdAccount = async (value, token, page = 0) => {
  const config = {
    withCredentials: true, // Remove if not needed
    params: {
      page: page, // Dynamic page
      size: 10, // Default size
    },
    headers: {
      Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
    },
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/userAccountId/${value}`,
      config
    );
    //console.log("response:", response);
    //console.log("response data:", response.data);
    return response;
  } catch (error) {
    // Enhanced error logging
    console.error("An error occurred:", error);
    return "404";
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

const payment = async (paymentData) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/payment`,
      paymentData,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const sendArs = async (transferData) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/sendArs`,
      transferData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al enviar al dinero");
    }
  }
};

const getFilteredTransactionsByIdAccount = async (
  value,
  token,
  page = 0,
  size = 10,
  minAmount = null,
  maxAmount = null,
  type = null,
  concept = null
) => {
  const config = {
    withCredentials: true, // Remove if not needed
    params: {
      page: page, // Dynamic page
      size: size, // Default size
    },
    headers: {
      Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
    },
  };

  // Adding optional query parameters if they are not null
  if (minAmount !== null) {
    config.params.minAmount = minAmount;
  }
  if (maxAmount !== null) {
    config.params.maxAmount = maxAmount;
  }
  if (type !== null && type) {
    config.params.type = type;
  }
  if (concept !== null && concept) {
    config.params.concept = concept;
  }
  console.log("LA CONFIG ES:  ", config);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/userAccountId/${value}/filters`,
      config
    );
    //console.log("response:", response);
    //console.log("response data:", response.data);
    return response;
  } catch (error) {
    // Enhanced error logging
    console.error("An error occurred:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return "404";
  }
};

const sendUsd = async (transferData) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/sendUsd`,
      transferData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error("Ha ocurrido un error al enviar el dinero");
    }
  }
};


const getTransactionsSummaryByIdAccount = async (value, token) => {
  const config = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
    },
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${value}/summaryPerMoth` ,config);
    console.log("response:", response);
    //console.log("response data:", response.data);
    return response;
  } catch (error) {
    // Enhanced error logging
    console.error("An error occurred:", error);
    return "404";
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
export {
  deposit,
  payment,
  sendArs,
  sendUsd,
  getTransactionsByIdAccount,
  getFilteredTransactionsByIdAccount,
  getTransactionsSummaryByIdAccount,
};
