import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {auth} from './firebase';
import {useStateValue} from "./StateProvider";
import AddressInfo from './AddressInfo';
import Orders from './Orders';
import ProductDetails from './ProductDetails';

const promise = loadStripe('pk_test_51HTlbuFm8AspTnLCxETGqVwCrJRJDu8nGByAG9OBcWu2v8I1n12TZS0kzYdofdI6Fm39suHENoNyVx62miCulm7U00dj9aLkGh');

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }
      else{
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/addressInfo">
            <Header />
            <AddressInfo />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/productDetails">
            <Header />
            <ProductDetails />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
