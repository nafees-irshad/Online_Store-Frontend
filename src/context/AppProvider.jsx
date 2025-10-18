/** @format */

import React from 'react';
import { CartProvider } from './CartContext';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './WishlistContext';

export const AppProvider = ({ children }) => {
	return (
		<BrowserRouter>
			<CartProvider>
				<WishlistProvider>{children}</WishlistProvider>
			</CartProvider>
		</BrowserRouter>
	);
};
