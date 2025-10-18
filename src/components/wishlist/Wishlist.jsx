/** @format */

import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useWishlist } from '../../context/WishlistContext';

function WishListItems() {
	const { wishlist, loading } = useWishlist();
	const products = wishlist.products;
	// ✅ Handle loading first
	if (loading) {
		return <p>Loading wishlist...</p>;
	}
	if (!products || products.length === 0) {
		return <p>No items in your wishlist.</p>;
	}

	const handleRemoveItem = async (productId) => {
		try {
			onRemoveItem(productId);
			await axios.post('/user/wishlist', {
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
				{products.map((product) => (
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
