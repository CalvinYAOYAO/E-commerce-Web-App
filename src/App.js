import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Purchase from './purchase';
import PaymentEntry from './paymentEntry';
import ShippingEntry from './shippingEntry';
import ViewOrder from './viewOrder';
import ViewConfirmation from './viewConfirmation';

import SampleFooter from "./components/footer";
import NavBar from './components/Navbar'
import Home from './components/home';
import About from './components/about';
import Cart from './components/cart';
import data from "./data";


function App() {
  const { products } = data;
  //set cart items is a function to change the value of cart items
  //cart items is an array with all the items in the cart
  const [cartItems, setCartItems] = useState([])
  //productQuantities is a dictionary with product id as key and product quantitiy as value
  // this is used when the user changes the quanitity of the product they would like to buy on the purchase page
  const [productQuantities, setProductQuantities] = useState({})

  //function for when add to cart button is clicked
  const onAddToCart = (product) => {
    let productInCart = false
    let productQty = 1 //assume productQty is 1 if the product id is not in productQuantities becuase the user
    //lickley didn't change it from its defult value
    if (product.id in productQuantities)
    {
      productQty = productQuantities[product.id]
    }

    for (const cartItem of cartItems) {
      if (cartItem.id === product.id) {
        cartItem.qty += productQty
        productInCart = true
      }
    }
    if (!productInCart)
    {
      product.qty = productQty
      cartItems.push(product)
    }

    setCartItems(cartItems)

  }

  const onQuantityChanged = (productId, qty) => {
    productQuantities[productId] = parseInt(qty)
    setProductQuantities(productQuantities)
  }

  return (
      <div className="App">
        <Router>
          <div className='content'>
            <NavBar/>
            <Routes>

              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<Cart cartItems = {cartItems}/>} />

              <Route path='/purchase' element={<Purchase onAddToCart={onAddToCart} onQuantityChanged={onQuantityChanged} products={products} productQuantities={productQuantities}/>} />
              <Route path='/' element={<Navigate replace to="/purchase" />} />
              <Route path='/purchase/paymentEntry' element={<PaymentEntry />} />
              <Route path='/purchase/shippingEntry' element={<ShippingEntry />} />
              <Route path='/purchase/viewOrder' element={<ViewOrder />} />
              <Route path='/purchase/viewConfirmation' element={<ViewConfirmation />} />
            </Routes>
          </div>

          <SampleFooter />
        </Router>
      </div>
  );
}

export default App;
