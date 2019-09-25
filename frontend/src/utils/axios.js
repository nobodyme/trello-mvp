import axios from 'axios';

const url = 'http://localhost:3001';
const axiosInstance = axios.create({
	baseURL: url
});

export default axiosInstance;
