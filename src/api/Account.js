import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/accounts';

const getAccountBalance = async() => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/balance`, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAccountBalance };

const getAccountDetaileByCBU = async(value) => {
    const config = {
        withCredentials: true,
        params: {
            value: value // Aquí es donde se define el parámetro de solicitud
        }
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/search`, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAccountDetaileByCBU };