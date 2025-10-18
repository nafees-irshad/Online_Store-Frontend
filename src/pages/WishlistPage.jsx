/** @format */

import React, { useEffect, useState } from 'react';
import WishListItems from '../components/wishlist/Wishlist';

function Wishlist() {
	// Function to remove item from wishlist
	// const removeFromWishlist = (productId) => {
	// 	if (!wishlist || !wishlist.products) return;

	// 	// Update the state immediately for better UX
	// 	setWishlist((prevWishlist) => ({
	// 		...prevWishlist,
	// 		products: prevWishlist.products.filter(
	// 			(product) => product._id !== productId
	// 		),
	// 	}));
	// };

	// if (loading) return <div>Loading...</div>;
	// if (error) return <div>Error: {error}</div>;

	return (
		<>
			<WishListItems />
		</>
	);
}

export default Wishlist;
