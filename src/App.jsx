/** @format */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/navigationBar.component';

import Signup from './components/users/Signup';
import Login from './components/users/Login';
import { AuthProvider } from './components/Auth/AuthContext';
import Products from './pages/ProductPage';
import Wishlist from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function Home() {
	return null;
}

const App = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<Router>
					<Navigation />
					{/* ADD THE MISSING Routes COMPONENT */}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/login' element={<Login />} />
						<Route path='/products' element={<Products />} />
						<Route path='/cart' element={<CartPage />} />
						<Route path='/wishlist' element={<Wishlist />} />
					</Routes>
				</Router>
			</CartProvider>
		</AuthProvider>
	);
};
export default App;
