/** @format */

import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useAuth } from '../components/Auth/AuthContext';
import api from '../Common/api';
import WishListItems from '../components/wishlist/Wishlist';

function Wishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				if (!token) {
					setError('Please Signup or login to view your wishlist');
					setLoading(false);
					return;
				}
				const res = await api.get('/user/wishlist', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setWishlist(res.data.data);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching wishlist:', err);
				setError('Failed to load wishlist');
				setLoading(false);
			}
		};
		fetchWishlist();
	}, [token]);
	// Function to remove item from wishlist
	const removeFromWishlist = (productId) => {
		if (!wishlist || !wishlist.products) return;

		// Update the state immediately for better UX
		setWishlist((prevWishlist) => ({
			...prevWishlist,
			products: prevWishlist.products.filter(
				(product) => product._id !== productId
			),
		}));
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<WishListItems 
				wishlistItems={wishlist}
				onRemoveItem={removeFromWishlist}
			/>
		</>
	);
}

export default Wishlist;
