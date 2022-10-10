import React from "react";
import { useNavigate } from "react-router-dom";
import './viewConfirmation.css';
import StepsBar from "./components/StepsBar";

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
            <StepsBar curStep = {5}/>
            <h1 class = "smallIntro">Your Confirmation Number is:</h1>
            <h2 class = "confirm">{randomString}</h2>
            <br></br>
            <button class="btn btn-secondary" onClick={handleContinue}>
                Continue
            </button>
        </div>
    );
}

export default ViewConfirmation;