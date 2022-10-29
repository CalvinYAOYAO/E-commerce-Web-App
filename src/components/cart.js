import React from "react";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import StepsBar from "./StepsBar";


const Cart = (props) => {
    const {cartItems} = props;
    let navigate = useNavigate();

    async function handleContinue(event) {
        navigate('/purchase/shippingEntry', {replace: true});
    }

    let total = 0
    for (const cartItem of cartItems) {
        total = total + (cartItem.price * cartItem.qty)
    }

    return (
        <div>
            <StepsBar curStep = {1}/>
            <h2>
                Shopping Cart
            </h2>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td><img className={"img-thumbnail"} src={product.image} alt={product.name} width="50"></img></td>
                            <td>{product.name}</td>
                            <td>{product.qty}</td>
                            <td>${product.qty * product.price}</td>
                        </tr>
                    );

                })}
                </tbody>
            </table>

            <p className={"text-end"}>Total Price: ${total} &emsp; &emsp;</p>

            <button disabled={cartItems.length === 0} type="button" className="btn btn-primary" onClick={handleContinue}>
                Continue
            </button>

        </div>
    );
};

export default Cart;