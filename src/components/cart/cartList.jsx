/** @format */

import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

function CartItems({ cartItems }) {
	// Fixed the condition check
	if (!cartItems || !cartItems.products || cartItems.products.length === 0) {
		return <p>No items in your cart.</p>;
	}
	// Calculate total price 
	const totalPrice = cartItems.products.reduce((total, item) => {
		return total + item.productId.price * item.quantity;
	}, 0);

	return (
		<div className='cart-container'>
			<h1>Your Cart</h1>

			<div className='cart-table'>
				<div className='table-header'>
					<div className='header-product'>Product</div>
					<div className='header-price'>Price</div>
					<div className='header-quantity'>Quantity</div>
					<div className='header-subtotal'>Subtotal</div>
					<div className='header-action'>Action</div>
				</div>

				<div className='table-body'>
					{cartItems.products.map((item) => (
						<div key={item._id} className='table-row'>
							{/* Product Column */}
							<div className='cell product-cell'>
								<div className='product-info'>
									{/* Add product image if available */}
									{item.productId.images &&
										item.productId.images.length > 0 && (
											<img
												src={item.productId.images[0]}
												alt={item.productId.name}
												className='product-image'
											/>
										)}
									<div className='product-details'>
										<h3 className='product-name'>{item.productId.name}</h3>
										{/* Add product category or other details if needed */}
										{item.productId.category && (
											<p className='product-category'>
												{item.productId.category}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Price Column */}
							<div className='cell price-cell'>
								<span className='price'>${item.productId.price}</span>
							</div>

							{/* Quantity Column */}
							<div className='cell quantity-cell'>
								<div className='quantity-controls'>
									<button
										onClick={() =>
											handleQuantityChange(
												item.productId._id,
												item.quantity - 1
											)
										}
										disabled={item.quantity <= 1}
										className='quantity-btn minus'>
										-
									</button>
									<span className='quantity-display'>
										{item.quantity.toString().padStart(2, '0')}
									</span>
									<button
										onClick={() =>
											handleQuantityChange(
												item.productId._id,
												item.quantity + 1
											)
										}
										className='quantity-btn plus'>
										+
									</button>
								</div>
							</div>

							{/* Subtotal Column */}
							<div className='cell subtotal-cell'>
								<span className='subtotal'>
									${(item.productId.price * item.quantity).toFixed(2)}
								</span>
							</div>

							{/* Action Column */}
							<div className='cell action-cell'>
								<button
									onClick={() => handleRemoveItem(item.productId._id)}
									className='remove-btn'
									title='Remove item'>
									<FiTrash2 />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Cart Summary */}
			<div className='cart-summary'>
				<div className='total-section'>
					<h3>Total: ${totalPrice.toFixed(2)}</h3>
					<button className='checkout-btn'>Proceed to Checkout</button>
				</div>
			</div>
		</div>
	);
}

export default CartItems;
