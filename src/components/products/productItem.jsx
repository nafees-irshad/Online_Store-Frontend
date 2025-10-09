/** @format */

import React, { useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../Auth/AuthContext';
import api from '../../Common/api';

function ProductItem({ product }) {
	const [quantity, setQuantity] = useState(1);
	const { token } = useAuth();

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
	const handleAddToCart = async () => {
		if (!token) {
			alert('Please login to add itmes in cart');
			return;
		}

		try {
			await api.post('/cart/add', {
				productId: product._id,
				qty: quantity,
			});
			alert(`Added ${quantity} item(s) to cart!`);
			setQuantity(1); // Reset to default after adding
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
				<button className='shoppoing-cart' onClick={handleAddToCart}>
					<FaShoppingCart />
				</button>
			</li>
		</>
	);
}

export default ProductItem;
