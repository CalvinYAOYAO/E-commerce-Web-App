import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import PaymentContext from "./store/payment-context";
import { useContext } from "react";
import StepsBar from "./components/StepsBar";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';



const ViewOrder = (props) => {
    const {cartItems} = props;
    const paymentCtx = useContext(PaymentContext);

    let title = "viewOrder page";

    let navigate = useNavigate();

    var itemList = [];
    var quantityList = [];
    cartItems.map((product) => {
        itemList.push(product.id);
        quantityList.push(product.qty);
    });


    var orderData = {
        email: localStorage.getItem('Email'),
        address: localStorage.getItem('Postal Address'),
        postal: localStorage.getItem('Zip Code'),
        shipping_method: localStorage.getItem('Shipping Method'),
        card_num: paymentCtx.userPaymentInfo.number,
        exp: paymentCtx.userPaymentInfo.month,
        cvv: paymentCtx.userPaymentInfo.code,
        items: itemList,
        quantities: quantityList
    }

    var data;

    // get orderProcessing info from microservice
    useEffect(()=> {
        axios.post("https://kfqvfmukae.execute-api.us-east-1.amazonaws.com/formal/orderprocessing", {
          order: orderData
        }).then(res => {data = res.data})
      }, []);


    const handleClick = (event) => {
        event.preventDefault();
        if (data.isValid) {
            // use useNavigate and useLocation hooks to pass props to confirm page
            navigate('/purchase/viewConfirmation', { state: { confirmNum: data.confirmNum }, replace: true });
        }else {
            alert("We don't have enough stockings. Please modify your quantity.");
        }
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

            <div className="card-group">
                <div className="card" >
                    <div className="card-body">
                        <div className="card-header">
                            <h5 className="card-title">Shipment Info</h5>
                        </div>
                        <p className="card-text">Address: {localStorage.getItem('Postal Address')}</p>
                        <p className="card-text">Shipping Method: {localStorage.getItem('Shipping Method')}</p>
                        <p className="card-text">Email: {localStorage.getItem('Email')}</p>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <div className="card-header">
                            <h5 className="card-title">Payment Info</h5>
                        </div>
                        <p className="card-text">Card Number: {paymentCtx.userPaymentInfo.number}</p>
                        <p className="card-text">Amount: {amount}</p>
                    </div>
                </div>
            </div>

            

            <div style={{marginTop: '50px'}}>
                <button className="btn btn-primary" onClick={handleClick}>Place Order</button>
            </div>
        </div>
        

    );
}

export default ViewOrder;