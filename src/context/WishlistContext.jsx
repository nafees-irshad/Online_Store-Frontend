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
					setWishlist(res.data.wishlist);
					// setLoading(false);
				} else {
					console.error('Failed to load wishlist', res.data.message);
				}
			} catch (err) {
				console.error('Error fetching wishlist:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchWishlist();
	}, []);
	return (
		<WishlistContext.Provider value={{ wishlist, loading }}>
			{children}
		</WishlistContext.Provider>
	);
};
