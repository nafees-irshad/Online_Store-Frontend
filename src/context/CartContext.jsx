/** @format */

import React, { createContext, useContext, useState } from 'react';
import api from '../Common/api';
import { useAuth } from '../components/Auth/AuthContext';

const CartContext = createContext();

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export const CartProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	// const [cart, setCart] = useState([]);
	const { token } = useAuth();

	const handleAddToCart = async (productId, quantity = 1) => {
		if (!token) {
			alert('Please login to add items to cart');
			return;
		}
		try {
			await api.post('/cart/add', { productId, quantity });
			alert('Product added to cart successfully');
		} catch (err) {
			console.error('Error adding to cart:', err);

			if (err.response?.status === 400) {
				alert('Product is out of stock');
			} else if (err.response?.status === 404) {
				alert('Product not found');
			} else {
				alert('Failed to add to cart');
			}
		}
		if (loading) return <div>Loading...</div>;
		if (error) return <div>Error: {error}</div>;
	};
	return (
		<CartContext.Provider value={{ handleAddToCart }}>
			{children}
		</CartContext.Provider>
	);
};
