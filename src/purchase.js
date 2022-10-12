import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import StepsBar from "./components/StepsBar";

import {useNavigate} from "react-router-dom";

const Purchase = (props) => {
    const {products, onAddToCart, onQuantityChanged, productQuantities} = props; // this is an array of products from the data.js file
    
    let navigate = useNavigate();

    async function handleContinue(event) {
        navigate('/cart', {replace: true});
    }
    
    return (
        <div>
            <StepsBar curStep = {0}/>

            <h2>
                Available Products
            </h2>

            <table class="table table-striped table-hover">
                <thead>
                <tr>

                    <th>Picture</th>
                    <th class={"text-start"}>Name</th>
                    <th class={"text-start"}>Description</th>
                    <th class={"text-start"}>Price</th>
                    <th>Quantity</th>
                    <th>Add to cart</th>
                </tr>
                </thead>

                {/* for each product in the products array make a row in the table for the
            product*/}
                <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td><img class={"img-thumbnail"} src={product.image} alt={product.name} width="100" ></img></td>
                            <td class={"text-start"}>{product.name}</td>
                            <td class={"text-start"}> {product.description}</td>
                            <td class={"text-start"}>${product.price}</td>
                            <td><select class={"selectwidthauto form-select"} name={"Quantity" + product.id}
                                        id={"Quantity" + product.id}
                                        onChange={event => onQuantityChanged(product.id, event.target.value)}
                                        defaultValue={product.id in productQuantities ? productQuantities[product.id] : 1}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select></td>
                            <th>
                                <button class={"btn btn-primary"} onClick={() => onAddToCart(product)}>Add to cart
                                </button>
                            </th>
                        </tr>
                    );

                })}
                </tbody>

            </table>

            <button type="button" className="btn btn-primary" onClick={handleContinue}>
                Continue
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
                    A new phone has been added to your cart.
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Purchase;