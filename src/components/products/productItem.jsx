/** @format */

import React, { useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../Auth/AuthContext';
import api from '../../Common/api';
import { useCart } from '../../context/CartContext';

function ProductItem({ product }) {
	const { token } = useAuth();
	const { handleAddToCart } = useCart();

	const handleAddWishlist = async () => {
		if (!token) {
			alert('Please login to add items to wishlist');
			return;
		}

		try {
			const response = await api.post('/user/wishlist', {
				productId: product._id,
				action: 'add',
			});

			// Success case
			alert('Product added to wishlist!');
		} catch (err) {
			// console.error('Error adding to wishlist:', err);

			// Handle specific error cases
			if (
				err.response?.status === 400 &&
				err.response?.data?.message === 'Product already in wishlist'
			) {
				alert('This product is already in your wishlist!');
			} else if (err.response?.status === 400) {
				alert(err.response.data.message || 'Failed to add to wishlist');
			} else if (err.response?.status === 404) {
				alert('Product not found');
			} else {
				alert('Failed to add to wishlist');
			}
		}
	};

	return (
		<>
			<li>
				<h3>{product.name}</h3>
				<p>Price: ${product.price}</p>
				<p>Brand: {product.commonDetails?.brand}</p>
				<p>Description: {product.commonDetails?.description}</p>
				<p>In Stock: {product.qty}</p>
				<button className='wishlist-button' onClick={handleAddWishlist}>
					<FaHeart />
				</button>
				<button
					className='shoppoing-cart'
					onClick={() => handleAddToCart(product._id)}>
					<FaShoppingCart />
				</button>
			</li>
		</>
	);
}

export default ProductItem;
