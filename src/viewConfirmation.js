import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './viewConfirmation.css';
import StepsBar from "./components/StepsBar";
import { Toast } from 'bootstrap';
import { useEffect, useState } from 'react';


const ViewConfirmation = () => {
    let navigate = useNavigate();
    // let title = "Confirmation Page";

    const location = useLocation();

    async function handleContinue(event) {
        navigate('/purchase', { replace: true });
    }

    localStorage.setItem('Confirmation', location.state.confirmNum);

    const [playAnimation, setPlayAnimation] = useState(false);

    // This will run one time after the component mounts
    // https://shipshape.io/blog/wait-for-page-load-in-react/
    useEffect(() => {
        const onPageLoad = () => {
            setPlayAnimation(true);
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new Toast(toastLiveExample)
            toast.show()
        };

        // Check if the page has already loaded
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    return (
        <div>
            <StepsBar curStep = {5}/>
            <h1 class = "smallIntro">Your Confirmation Number is:</h1>
            <h2 class = "confirm">{location.state.confirmNum}</h2>
            <br></br>
            <button class="btn btn-primary" onClick={handleContinue}>
                Done
            </button>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                    <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
                    <strong class="me-auto">PineApple Bot</strong>
                    <small>just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                    A confirmation email has been sent to your email.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewConfirmation;