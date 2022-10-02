import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function shippingEntry() {
    let title = "shippingEntry page";

    let navigate = useNavigate();

    const [postal, setPostal] = useState('');
    const [shippingMethod, setMyShippingMethod] = useState("Regular");
    const [email, setEmail] = useState('');

    const handleOptionChange = (event) => {
        setMyShippingMethod(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem('Postal Address', postal);
        localStorage.setItem('Shipping Method', shippingMethod);
        localStorage.setItem('Email', email);

        /*Use these to access data on later screen*/
        console.log(localStorage.getItem('Postal Address'));
        console.log(localStorage.getItem('Shipping Method'));
        console.log(localStorage.getItem('Email'));

        navigate('/purchase/paymentEntry', { replace: true });
    }

    return (
        <div>
            <h1>
                {title}
            </h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter your postal address:
                        <input
                            id="Postal"
                            name="Postal"
                            type="text"
                            value={postal}
                            onChange={(e) => setPostal(event.target.value)}
                        />
                    </label>
                    <br/>
                    <label>Select shipping method:
                        <select value={shippingMethod} onChange={handleOptionChange}>
                            <option value="Regular">Regular</option>
                            <option value="Expedited">Expedited</option>
                        </select>
                    </label>
                    <br/>
                    <label>Enter your email:
                        <input
                            id="Email"
                            name="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(event.target.value)}
                        />
                    </label>
                    <br/>
                    <input type="submit" />
                </form>
        </div>
    )
};

export default shippingEntry;
