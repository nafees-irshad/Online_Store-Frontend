/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext(); 

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
 
export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// ✅ Fetch cart data
	useEffect(() => {
		const fetchCart = async () => {
			try {
				const res = await axios.get('http://localhost:3001/api/cart/view');
				setCart(res.data.cart || []);
			} catch (err) {
				console.error('Error fetching cart:', err);
				setError('Failed to load cart');
			} finally {
				setLoading(false);
			}
		};
		fetchCart();
	}, []);

	// ✅ Add to cart
	const handleAddToCart = async (productId, quantity = 1) => {
		try {
			await axios.post('http://localhost:3001/api/cart/add', {
				productId,
				quantity,
			});
			alert('Product added to cart successfully');
		} catch (err) {
			console.error('Error adding to cart:', err);
			alert('Failed to add to cart');
		}
	};

	// ✅ Update cart quantity directly (send productId & quantity)
	const updateCartQty = async (productId, quantity) => {
		try {
			// setLoading(true);
			const res = await axios.put('http://localhost:3001/api/cart/update', {
				productId,
				quantity,
			});
			if (res.data.status === 'Success') {
				setCart(res.data.cart);
			} else {
				alert(res.data.message || 'Failed to update cart');
			}
		} catch (err) {
			console.error('Error updating cart:', err);
			alert('Failed to update cart');
		} finally {
			setLoading(false);
		}
	};

	// ✅ Remove item (set quantity to 0)
	const removeFromCart = async (productId) => {
		await updateCartQty(productId, 0);
	};

	//delete from cart
	const deleteCart = async () => {
		try {
			const res = await axios.delete('http://localhost:3001/api/cart/delete');
			if (res.data.status === 'success') {
				setCart([]);
				console.log('Cart deleted successfully');
			} else {
				console.error('Failed to delete cart:', res.data.message);
			}
		} catch (err) {
			console.error('Error deleting cart:', err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<CartContext.Provider
			value={{
				cart,
				handleAddToCart,
				updateCartQty,
				removeFromCart,
				deleteCart,
				loading,
				error,
			}}>
			{children}
		</CartContext.Provider>
	);
};
 