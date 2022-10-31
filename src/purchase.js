import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import StepsBar from "./components/StepsBar";

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Purchase = (props) => {
    const {onAddToCart, onQuantityChanged, productQuantities} = props; // this is an array of products from the data.js file
    const [products, setProducts] = useState([])
    let navigate = useNavigate();

    async function handleContinue(event) {
        navigate('/cart', {replace: true});
    }

    // https://stackoverflow.com/a/66622201
    useEffect(()=> {
        // fetch("https://57bg18w306.execute-api.us-east-2.amazonaws.com/v1/inventory/")
        fetch("https://57bg18w306.execute-api.us-east-2.amazonaws.com/v2/products")
            .then( response => response.json() )
            .then( data => setProducts(data.products) )
    }, [])

    console.log(products)

    return (
        <div>
            <StepsBar curStep = {0}/>

            <h2>
                Available Products
            </h2>

            <table className="table table-striped table-hover">
                <thead>
                <tr>

                    <th>Picture</th>
                    <th className={"text-start"}>Name</th>
                    <th className={"text-start"}>Description</th>
                    <th className={"text-start"}>Price</th>
                    <th>Quantity</th>
                    <th>Add to cart</th>
                </tr>
                </thead>

                {/* for each product in the products array make a row in the table for the
            product*/}
                <tbody>
                {products.map((product) => {
                    if (product.stock>0) {
                        return (
                            <tr key={product.id}>
                                <td><img className={"img-thumbnail"} src={product.image} alt={product.name}
                                         width="100"></img></td>
                                <td className={"text-start"}>{product.name}</td>
                                <td className={"text-start"}> {product.desc}</td>
                                <td className={"text-start"}>${product.price}</td>
                                <td><select className={"selectwidthauto form-select"} name={"Quantity" + product.id}
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
                                    <button className={"btn btn-primary"} onClick={() => onAddToCart(product)}>Add
                                        to cart
                                    </button>
                                </th>
                            </tr>
                        );
                    }
                    else
                    {
                        return ""
                    }
                })}
                </tbody>

            </table>

            <button type="button" className="btn btn-primary" onClick={handleContinue}>
                Continue
            </button>

        </div>

    );
}

export default Purchase;