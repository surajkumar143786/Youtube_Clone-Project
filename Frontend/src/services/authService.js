import axios from "axios";

/*Base URL of backend server*/
const API_URL = "http://localhost:5000/api/auth";

/*Register user API*/
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

/*Login user API*/
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};
