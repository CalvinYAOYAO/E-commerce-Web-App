import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function ViewOrder(props) {
    const {cartItems} = props;
    let title = "viewOrder page";

    let navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/purchase/viewConfirmation', { replace: true });
    }

    return (
        <div>
            <h1>
                {title}
            </h1>

            <div>
                <h3>Items</h3>
                <th>Picture</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                {cartItems.map( (product) => {
                    return (
                        <tr key={product.id}>
                            <td> <img src={product.image} alt={product.name} width="50"
                                    height="50"></img> </td>
                            <td>{product.name}</td>
                            <td>{product.qty}</td>
                            <td>{product.qty * product.price}</td>
                        </tr>
                    );
                })}
            </div>

            <div>
                <h3>Shipping Info</h3>
            
            </div>

            <div>
                <h3>Payment Info</h3>
            
            </div>

            <div>
                <button onClick={handleClick}>Place Order</button>
            
            </div>
        </div>
        

    );
}

export default ViewOrder;