import React from "react";
import { useNavigate } from "react-router-dom";



const Cart = (props) => {
  const {cartItems} = props;
  let navigate = useNavigate();

    async function handleContinue(event) {
        navigate('/purchase/viewConfirmation', { replace: true });
    }

  return (
    <div>
      <h1>
        shopping cart page
      </h1>
        <th>Picture</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Total Price</th>
        {cartItems.map( (product) => {
            return (
                <tr key={product.id}>
                    <td> <img src={product.image} alt={product.name} width="50"
                              height="50"></img> </td>
                    <td>{product.name}</td>
                    <td>{product.qty}</td>
                    <td>{product.qty * product.price}</td>
                </tr>
            );

        })}


      <button onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};
  
export default Cart;