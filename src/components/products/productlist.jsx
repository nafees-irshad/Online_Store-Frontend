/** @format */

import React from 'react';
import ProductItem from './productItem';

function ProductList({ products }) {
	return (
		<>
			<div>
				<ul>
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</ul>
			</div>
		</>
	);
}

export default ProductList;
  