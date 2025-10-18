// /** @format */

// // src/components/Auth/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
// 	const [token, setToken] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	// Check if token exists in sessionStorage on app load
// 	useEffect(() => {
// 		const storedToken = sessionStorage.getItem('authToken');
// 		if (storedToken) {
// 			setToken(storedToken);
// 		}
// 		setLoading(false);
// 	}, []);

// 	// Login function to store token
// 	const login = (newToken) => {
// 		setToken(newToken);
// 		sessionStorage.setItem('authToken', newToken);
// 	};

// 	// Logout function to remove token
// 	// const logout = () => {
// 	// 	setToken(null);
// 	// 	sessionStorage.removeItem('authToken');
// 	// };

// 	const value = {
// 		token,
// 		login,
// 		logout,
// 		loading,
// 	};

// 	return (
// 		<AuthContext.Provider value={value}>
// 			{!loading && children}
// 		</AuthContext.Provider>
// 	);
// };
