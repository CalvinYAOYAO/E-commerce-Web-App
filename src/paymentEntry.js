import React from "react";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PaymentContext from "./store/payment-context";
import classes from "./paymentEntry.module.css";
import StepsBar from "./components/StepsBar";

const PaymentEntry = (props) => {
    const paymentCtx = useContext(PaymentContext);
    const numberRef = useRef();
    const monthRef = useRef();
    const codeRef = useRef();

    let title = "Payment Information";
    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const paymentInfo = {
            number: numberRef.current.value,
            month: monthRef.current.value,
            code: codeRef.current.value,
        }
        console.log(paymentInfo);
        paymentCtx.setPaymentInfo(paymentInfo);
        paymentCtx.showPaymentInfo();

        navigate('/purchase/viewOrder', { replace: true });
    }

    return (
        <div>
            <StepsBar curStep = {3}/>
            <h3>
                {title}
            </h3>
                <div className={classes.center}>
                <form onSubmit={submitHandler}>
                    <div class="mb-3" >
                        <label class="form-label" htmlFor="cardNumber">Credit Card Number</label>
                        <input class="form-control" type='number' required id='cardNumber' ref={numberRef}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" htmlFor="cardMonth">Expiration Month</label>
                        <input class="form-control" type='month' required id='cardMonth' ref={monthRef}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" htmlFor="cardCode">Security Code</label>
                        <input class="form-control" type='number' required id='cardCode' ref={codeRef}/>
                    </div>
                    <div>
                        <button class="btn btn-primary">
                            Add Payment 
                        </button>
                    </div>
                </form></div>
        </div>
    );
}

export default PaymentEntry;