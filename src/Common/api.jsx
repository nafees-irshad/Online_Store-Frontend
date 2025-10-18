// /** @format */

// // src/components/Common/api.js
// import axios from 'axios';

// // Create axios instance 
// const api = axios.create({
// 	baseURL: 'http://localhost:3001/api',
// });

// // Add token to requests automatically
// api.interceptors.request.use(
// 	(config) => {
// 		const token = sessionStorage.getItem('authToken');
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// // Handle authentication errors
// api.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response?.status === 401) {
// 			// Token expired or invalid
// 			sessionStorage.removeItem('authToken');
// 			window.location.href = '/login'; // Redirect to login
// 		}
// 		return Promise.reject(error);
// 	}
// );

// export default api;
