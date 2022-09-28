import logo from './logo.svg';
import './App.css';
import React from 'react';
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


function App() {
  return (
    <div className="App">
      <Router>
        <div className='content'>
          <NavBar/>
          <Routes>

            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />

            <Route path='/purchase' element={<Purchase />} />
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
