import React from "react";

function CartItems(cartItems){
    if( !cartItems ||
        !cartItems.products ||
        !cartItems.products.length === 0
    ) {
        return <p>No items in your cart.</p>;
    }
    return (
        <>
        <h1>Your Cart</h1>
        <ul>
            {cartItems.products.map((product)=>(
                <li key={product.id}>
                    <h3>{product.name}</h3>
                    <
                </li>
            ))}
        </ul>
        </>
    )
} 