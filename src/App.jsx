/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/navigationBar.component';

import Signup from './components/users/Signup';
import Login from './components/users/Login';
import Products from './pages/ProductPage';
import Wishlist from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import { AppProvider } from './context/AppProvider';
function Home() {
	return (
		<div>
			<h1>Welcome to Our Store</h1>
			<p>Browse our amazing products!</p>
		</div>
	);
}

const App = () => {
	return (
		<AppProvider>
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
		</AppProvider>
	);
};
export default App;
