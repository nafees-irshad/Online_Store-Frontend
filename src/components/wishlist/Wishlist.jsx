/** @format */

import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../Auth/AuthContext';
import api from '../../Common/api';

function WishListItems({ wishlistItems, onRemoveItem }) {
	const { token } = useAuth();

	if (
		!wishlistItems ||
		!wishlistItems.products ||
		wishlistItems.products.length === 0
	) {
		return <p>No items in your wishlist.</p>;
	}

	const handleRemoveItem = async (productId) => {
		if (!token) {
			alert('Please login to add items to wishlist');
			return;
		}
		try {
			onRemoveItem(productId);
			await api.post('/user/wishlist', {
				productId,
				action: 'remove',
			});

			alert('Product removed from wishlist!');
		} catch (err) {
			console.error('Error Removing from wishlist:', err);
			alert('Failed to remove from wishlist');
		}
	};

	return (
		<>
			<h1>My Wishlist</h1>
			<ul>
				{wishlistItems.products.map((product) => (
					<li key={product._id}>
						<h3>{product.name}</h3>
						<p>Price: ${product.price}</p>
						<p>Brand: {product.commonDetails?.brand}</p>
						<button
							className='removeItem-wishlist'
							onClick={() => handleRemoveItem(product._id)}>
							<FiTrash2 />
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

export default WishListItems;
