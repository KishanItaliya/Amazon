import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from "./StateProvider"
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from "react-router-dom"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import { db } from "./firebase";
import axios from "./axios";

function Payment() {

    const history = useHistory()

    const [{ basket, user, userInfo }, dispatch] = useStateValue()

    const stripe = useStripe()
    const elements = useElements()
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)

    // const { name, email_id, address1, address2, city, state, country, zip, phone } = userInfo

    useEffect(() => {
        if(userInfo == null){
            history.push('/addressInfo');
        }
    }, [])

    useEffect(() => {
        if(userInfo != null){
            const getClientSecret = async () => {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${Math.round(getBasketTotal(basket)*100)}`,
                    data: {
                        name: userInfo.name,
                        email_id: userInfo.email_id,
                        address1: userInfo.address1,
                        address2: userInfo.address2,
                        city: userInfo.city,
                        state: userInfo.state,
                        country: userInfo.country,
                        zip: userInfo.zip,
                        phone: userInfo.phone
                    }
                })
                setClientSecret(response.data.clientSecret)
            }      
            getClientSecret();
        }
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setProcessing(true);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        })
        .then(({ paymentIntent }) => { 
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: "EMPTY_BASKET"
            })

            history.replace('/orders');
        })  
          
    }

    const onHandleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
 
    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            'color': 'navy',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '14px',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: 'red',
            iconColor: 'red',
          },
        },
      };

    return (
        <div className="payment">
            <div className="payment__container">
                
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
              
                <div className="payment__section">
                    <div className="payment__title">
                        <h3 className="payment__h3">Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    hideButton
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="payment__card">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    {/* <CardInput /> */}
                    <div className="payment__details">
                        <form>
                            <CardElement onChange={onHandleChange}  options={CARD_ELEMENT_OPTIONS}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} 
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                {user && (
                                    <button onClick={handleSubmit} disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                )}
                                {!user && (
                                    <Link to="/login">
                                        <button className="login__button">
                                            <span>Login Now</span>
                                        </button>
                                    </Link> 
                                )}
                                
                                
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment