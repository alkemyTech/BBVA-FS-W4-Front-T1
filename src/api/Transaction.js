import axios from 'axios';
import { useSelector } from 'react-redux';
const API_BASE_URL = 'http://localhost:8080/transactions';

const deposit = async (depositData) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/deposit`, depositData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getTransactionsByIdAccount = async (value, token, page = 0) => {
    const config = {
        withCredentials: true,
        params: {
            page: page, // página dinámica
            size: 10 // tamaño por defecto
        },
        headers: {
            Authorization: `Bearer ${token}` // Asumiendo que guardas el token en localStorage
        }
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/userAccountId/${value}`, config);
        console.log("response:", response);
        console.log("response data:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const payment = async (paymentData) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/payment`, paymentData, config);
        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};


export { deposit, payment, getTransactionsByIdAccount};

