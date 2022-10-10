import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './shippingEntry.css';

function ShippingEntry() {
    let title = "Shipping Information";

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
                <br></br>
                <form onSubmit={handleSubmit}>
                <label class="inputPrompt">Enter your postal address:&nbsp;&nbsp;
                        <input
                            id="Postal"
                            name="Postal"
                            type="text"
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                        />
                    </label>
                <br />
                <br></br>
                <label class="inputPrompt">Select shipping method:&nbsp;&nbsp;
                        <select value={shippingMethod} onChange={handleOptionChange}>
                            <option value="Regular">Regular</option>
                            <option value="Expedited">Expedited</option>
                        </select>
                    </label>
                <br />
                <br></br>
                <label class="inputPrompt">Enter your email:&nbsp;&nbsp;
                        <input
                            id="Email"
                            name="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                <br />
                <br></br>
                    <input type="submit" />
                </form>
        </div>
    )
};

export default ShippingEntry;
