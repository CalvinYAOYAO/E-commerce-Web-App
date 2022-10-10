import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PaymentContext from "./store/payment-context";
import { useContext } from "react";
import StepsBar from "./components/StepsBar";

import 'bootstrap/dist/css/bootstrap.min.css';



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
            <StepsBar curStep = {4}/>

            <h1>
                View Order
            </h1>

            
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>

            <div class="card-group">
                <div class="card" >
                    <div class="card-body">
                        <div class="card-header">
                            <h5 class="card-title">Shipment Info</h5>
                        </div>
                        <p class="card-text">Address: {localStorage.getItem('Postal Address')}</p>
                        <p class="card-text">Shipping Method: {localStorage.getItem('Shipping Method')}</p>
                        <p class="card-text">Email: {localStorage.getItem('Email')}</p>
                    </div>
                </div>
                <div class="card" >
                    <div class="card-body">
                        <div class="card-header">
                            <h5 class="card-title">Payment Info</h5>
                        </div>
                        <p class="card-text">Card Number: {paymentCtx.userPaymentInfo.number}</p>
                        <p class="card-text">Amount: {amount}</p>
                    </div>
                </div>
            </div>

            

            <div style={{marginTop: '50px'}}>
                <button class="btn btn-secondary" onClick={handleClick}>Place Order</button>
            </div>
        </div>
        

    );
}

export default ViewOrder;