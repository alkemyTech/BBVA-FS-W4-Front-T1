import axios from 'axios';
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

export { deposit, payment };
