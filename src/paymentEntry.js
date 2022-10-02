import React from "react";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PaymentContext from "./store/payment-context";

const PaymentEntry = (props) => {
    const paymentCtx = useContext(PaymentContext);
    const numberRef = useRef();
    const dateRef = useRef();
    const codeRef = useRef();

    let title = "paymentEntry page";
    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const paymentInfo = {
            number: numberRef.current.value,
            date: dateRef.current.value,
            code: codeRef.current.value,
        }
        console.log(paymentInfo);
        paymentCtx.setPaymentInfo(paymentInfo);
        paymentCtx.showPaymentInfo();

        navigate('/purchase/viewOrder', { replace: true });
    }

    return (
        <div>
            <h1>
                {title}
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="cardNumber">Credit Card Number</label>
                        <input type='text' required id='cardNumber' ref={numberRef}/>
                    </div>
                    <div>
                        <label htmlFor="cardDate">Exparation Date</label>
                        <input type='text' required id='cardDate'  ref={dateRef}/>
                    </div>
                    <div>
                        <label htmlFor="cardCode">Security Code</label>
                        <input type='text' required id='cardCode'  ref={codeRef}/>
                    </div>
                    <div>
                        <button>
                            Add Payment
                        </button>
                    </div>
                </form>
            </h1>
        </div>
    );
}

export default PaymentEntry;