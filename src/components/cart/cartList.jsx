/** @format */
 
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

function CartItems() {
	const { cart, updateCartQty, removeFromCart, deleteCart, loading } =
		useCart();

	const products = cart.products || cart; // support both shapes

	if (!products || products.length === 0) {
		return (
			<div className='cart-container'>
				<div className='breadcrumb'>
					<span>Home / Cart</span>
				</div>
				<p className='empty-cart'>No items in your cart.</p>
			</div>
		);
	}

	// ✅ Totals
	const subtotal = products.reduce((total, item) => {
		const price = item.productId?.price || 0;
		return total + price * item.quantity;
	}, 0);

	const total = subtotal;

	return (
		<div className='cart-container'>
			{/* Breadcrumb */}
			<div className='breadcrumb'>
				<span>Home / Cart</span>
				<button onClick={deleteCart} disabled={loading}>
					Delete Cart
				</button>
			</div>

			{/* Loading Overlay */}
			{loading && (
				<div className='loading-overlay'>
					<p>Updating cart...</p>
				</div>
			)}

			{/* Cart Table */}
			<div className='cart-table'>
				<div className='table-header'>
					<div className='header-product'>Product</div>
					<div className='header-price'>Price</div>
					<div className='header-quantity'>Quantity</div>
					<div className='header-subtotal'>Subtotal</div>
				</div>

				<div className='table-body'>
					{products.map((item) => (
						<div key={item._id} className='table-row'>
							{/* Product Column */}
							<div className='cell product-cell'>
								<div className='product-info'>
									{item.productId?.images &&
										item.productId.images.length > 0 && (
											<img
												src={item.productId.images[0]}
												alt={item.productId.name}
												className='product-image'
											/>
										)}
									<div className='product-details'>
										<h3 className='product-name'>{item.productId?.name}</h3>
									</div>
								</div>
							</div>

							{/* Price Column */}
							<div className='cell price-cell'>
								<span className='price'>${item.productId?.price}</span>
							</div>

							{/* Quantity Column */}
							<div className='cell quantity-cell'>
								<div className='quantity-controls'>
									<button
										onClick={() =>
											updateCartQty(
												item.productId._id || item.productId,
												item.quantity - 1
											)
										}
										disabled={loading}
										className='quantity-btn minus'>
										-
									</button>

									<span className='quantity-display'>
										{item.quantity.toString().padStart(2, '0')}
									</span>

									<button
										onClick={() =>
											updateCartQty(
												item.productId._id || item.productId,
												item.quantity + 1
											)
										}
										disabled={loading}
										className='quantity-btn plus'>
										+
									</button>
								</div>
							</div>

							{/* Subtotal Column */}
							<div className='cell subtotal-cell'>
								<span className='subtotal'>
									${(item.productId?.price * item.quantity).toFixed(2)}
								</span>
							</div>

							{/* Action Column */}
							<div className='cell action-cell'>
								<button
									onClick={() =>
										removeFromCart(item.productId._id || item.productId)
									}
									disabled={loading}
									className='remove-btn'
									title='Remove item'>
									<FiTrash2 />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Cart Total Section */}
			<div className='cart-total-section'>
				<div className='cart-total-card'>
					<h3>Cart Total</h3>
					<div className='total-row'>
						<span className='total-label'>Subtotal:</span>
						<span className='total-value'>${subtotal.toFixed(2)}</span>
					</div>
					<div className='total-row final-total'>
						<span className='total-label'>Total:</span>
						<span className='total-value'>${total.toFixed(2)}</span>
					</div>
					<button className='checkout-btn'>Proceed to Checkout</button>
				</div>
			</div>
		</div>
	);
}

export default CartItems;
