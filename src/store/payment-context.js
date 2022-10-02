import { createContext, useState } from "react";

const PaymentContext = createContext({
    userPaymentInfo: {},
    setPaymentInfo: (paymentInfo) => {},
    showPaymentInfo: () => {},
});

export function PaymentContextProvider(props) {

    const [paymentInfo, setPaymentInfo] = useState([]);
    const showPaymentInfo = () => {
        console.log(paymentInfo);
    };
    const context = {
        userPaymentInfo: paymentInfo,
        setPaymentInfo: setPaymentInfo,
        showPaymentInfo: showPaymentInfo,
    };

    return <PaymentContext.Provider value={context}>
        {props.children}
    </PaymentContext.Provider>
}

export default PaymentContext;