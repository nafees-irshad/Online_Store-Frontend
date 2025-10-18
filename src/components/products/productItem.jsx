/** @format */

import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function ProductItem({ product }) {
	const { handleAddToCart } = useCart();
	const { handleAddWishlist } = useWishlist();

	return (
		<>
			<li>
				<h3>{product.name}</h3>
				<p>Price: ${product.price}</p>
				<p>Brand: {product.commonDetails?.brand}</p>
				<p>Description: {product.commonDetails?.description}</p>
				<p>In Stock: {product.qty}</p>
				<button
					className='wishlist-button'
					onClick={() => handleAddWishlist(product._id)}>
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
