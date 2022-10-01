import React, {useState} from "react";

const purchase = (props) => {
    let title = "Purchase page";
    const { products, onAddToCart, onQuantityChanged, productQuantities} = props; // this is an array of products from the data.js file
    return (
        <div>
            <h1>
                {title}
            </h1>

            <tr>

                <th>Picture</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Add to cart</th>
            </tr>

            {/* for each product in the products array make a row in the table for the
            product {product.id in productQuantities && productQuantities[product.id] === 1 ? selected : ""}*/
            }
            {products.map( (product) => {
                return (
                    <tr key={product.id}>
                        <td> <img src={product.image} alt={product.name} width="50"
                                  height="50"></img> </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td><select name={"Quantity" + product.id} id={"Quantity" + product.id} onChange={event => onQuantityChanged(product.id,event.target.value)}
                        defaultValue={product.id in productQuantities ? productQuantities[product.id] : 1}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select></td>
                        <th> <button onClick={() => onAddToCart(product)} >Add to cart</button></th>
                    </tr>
                );

            })}

        </div>
    );
}

export default purchase;