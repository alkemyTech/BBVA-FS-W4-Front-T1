import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/fixedTerm';

const getFixedTerms = async (page = 0) => {
    const config = {
        withCredentials: true,
        params: {
            page: page,
            size: 10 
        }
    };

    try {
        const response = await axios.get(`${API_BASE_URL}`, config);
        console.log("response:", response);
        console.log("response data:", response.data);
        return response.data;
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
        throw error;
    }
};

export { getFixedTerms };

const simulateFixedTerm = async (fixedTermData) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/simulate`, fixedTermData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { simulateFixedTerm };
