import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import classes from "./shippingEntry.module.css";
import StepsBar from "./components/StepsBar";

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
            <StepsBar curStep={2} />
            <h3>
                {title}
            </h3>
            <div className={classes.center}>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3" >
                        <label class="inputPrompt form-label">Enter your postal address:&nbsp;&nbsp;
                        </label>
                        <input class="form-control"
                            id="Postal"
                            name="Postal"
                            type="text"
                            required
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                        />
                    </div>

                    <div class="mb-3" >

                        <label class="inputPrompt form-label">Select shipping method:&nbsp;&nbsp;
                            <select class="form-select" value={shippingMethod} onChange={handleOptionChange}>
                                <option value="Regular">Regular</option>
                                <option value="Expedited">Expedited</option>
                            </select>
                        </label>
                    </div>

                    <div class="mb-3" >
                        <label class="inputPrompt form-label">Enter your email:&nbsp;&nbsp;
                            <input class="form-control"
                                id="Email"
                                name="Email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <button class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ShippingEntry;
