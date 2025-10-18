/** @format */

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	return context;
};

export const WishlistProvider = ({ children }) => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//✅ Fetch wishlist data
	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const res = await axios.get('http://localhost:3001/api/user/wishlist');
				if (res.data.status === 'success') {
					setWishlist(res.data.wishlist || []);
					setLoading(false);
				}
			} catch (err) {
				{
					console.error('Error fetching wishlist:', err);
					setError('Failed to load wishlist');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchWishlist();
	}, []);

	//✅ Add to wishlist
	const handleAddWishlist = async (productId) => {
		try {
			const response = await axios.post(
				'http://localhost:3001/api/user/wishlist',
				{
					productId,
					action: 'add',
				}
			);

			// Success case
			alert('Product added to wishlist!');
		} catch (err) {
			console.error('Error adding to wishlist:', err);

			// Handle specific error cases
			if (response?.data?.message === 'Product already in wishlist') {
				alert('This product is already in your wishlist!');
			} else if (err.response?.status === 500) {
				console.log(err.response.data.message || 'Failed to add to wishlist');
			} else if (err.response?.status === 404) {
				console.log('Product not found');
			} else {
				console.log('Failed to add to wishlist');
			}
		}
	};
	return (
		<WishlistContext.Provider
			value={{ wishlist, handleAddWishlist, loading, error }}>
			{children}
		</WishlistContext.Provider>
	);
};
