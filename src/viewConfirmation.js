import React from "react";
import { useNavigate } from "react-router-dom";

const ViewConfirmation = () => {
    let navigate = useNavigate();
    let title = "Confirmation Page";
    

    async function handleContinue(event) {
        navigate('/purchase', { replace: true });
    }

    let randomString = (Math.random() + 1).toString(36).substring(2);
    randomString = randomString.toUpperCase();

    localStorage.setItem('Confirmation', randomString);

    return (
        <div>
            <h1>
                {title}
            </h1>
            <center><th> Your Confirmation Number is: {randomString}</th></center>

            <button onClick={handleContinue}>
                Continue
            </button>
        </div>
    );
}

export default ViewConfirmation;