import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PaymentContext from "./store/payment-context";
import { useContext } from "react";


const ViewOrder = (props) => {
    const {cartItems} = props;
    const paymentCtx = useContext(PaymentContext);

    let title = "viewOrder page";

    let navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/purchase/viewConfirmation', { replace: true });
    }

    var amount = 0;

    for (const product of cartItems) {
        amount += product.qty * product.price;
    }

    return (
        <div>
            <h1>
                {title}
            </h1>

            <div>
                <button class="btn btn-secondary" onClick={handleClick}>Place Order</button>
            </div>

            <div>
                <h3>
                    Items
                </h3>
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
                <h5>Postal Address: {localStorage.getItem('Postal Address')}</h5>
                <h5>Shipping Method: {localStorage.getItem('Shipping Method')}</h5>
                <h5>Email: {localStorage.getItem('Email')}</h5>
            </div>

            <div>
                <h3>Payment Info</h3>
                <h5>Card Number: {paymentCtx.userPaymentInfo.number}</h5>
                <h5>Amount: {amount}</h5>
            </div>

            
        </div>
        

    );
}

export default ViewOrder;