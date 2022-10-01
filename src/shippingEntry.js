import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function shippingEntry() {
    let title = "shippingEntry page";

    let navigate = useNavigate();

    const [postal, setPostal] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`${postal}\n${shippingMethod}\n${email}\n`)
        navigate('/purchase/paymentEntry', { replace: true });
    }

    const [shippingMethod, setMyShippingMethod] = useState("Regular");

    const handleOptionChange = (event) => {
        setMyShippingMethod(event.target.value)
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
