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
        withCredentials: true, // Remove if not needed
        params: {
            page: page, // Dynamic page
            size: 10 // Default size
        },
        headers: {
            Authorization: `Bearer ${token}` // Assuming you store the token in localStorage
        }
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/userAccountId/${value}`, config);
        console.log("response:", response);
        console.log("response data:", response.data);
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

