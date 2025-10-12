/** @format */

import React, { useEffect, useState } from 'react';
import api from '../Common/api';
import { useAuth } from '../components/Auth/AuthContext';
import CartItems from '../components/cart/cartList';

function CartPage() {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				if (!token) {
					setError('Please Signup or login to view your cart');
					setLoading(false);
					return;
				}
				const res = await api.get('/cart/view', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setCart(res.data.cart); // Set the complete cart object
				setLoading(false);
				// console.log(res.data.cart.products);
			} catch (err) {
				console.error('Error fetching wishlist:', err);
				setError('Failed to load wishlist');
				setLoading(false);
			}
		};
		fetchCart();
	}, [token]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<CartItems cartItems={cart} />
		</>
	);
}

export default CartPage;
