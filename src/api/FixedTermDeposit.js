import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/fixedTerm';

const fixedTerm = async (fixedTermData) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}`, fixedTermData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { fixedTerm };