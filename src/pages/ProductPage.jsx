/** @format */

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/products/productlist';
import React from 'react';

function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await axios.get(
					'http://localhost:3001/api/products/details'
				); // 🔹 Your GET API
				setProducts(res.data); // ✅ Store data in state
				setLoading(false);
			} catch (err) {
				console.error('Error fetching tasks:', err);
				setError('Failed to load tasks');
				setLoading(false);
			}
		};
		 
		fetchTasks();
	}, []);

	if (loading) return <p>Loading Products...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<h1>All Products</h1>
			<ProductList products={products} />
		</>
	);
}

export default Products;
