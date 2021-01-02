import React, {useState} from 'react';
import "./Product.css";
import TextTruncate from "react-text-truncate";
import {useStateValue} from "./StateProvider";
import { v4 as uuidv4 } from 'uuid';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Link } from 'react-router-dom';

function Product({ product }) {
    const [{basket}, dispatch] = useStateValue(); 
    const {product_id, title, description, price, image, rating} = product.data;

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: product_id,
                title: title,
                description: description,
                image: image,
                price: price,
                rating: rating,
                product_id: uuidv4()
            }
        })

        store.addNotification({
            title: "Product Added",
            message: 'Successfully',
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1500,
              onScreen: true,
              showIcon: true,
              touch: true
            },
        });
    }

    return (
        <div className="product">
            <div className="product__info">
                <h3>{title}</h3>
                <TextTruncate 
                line={2}
                element='p'
                truncateText='...'
                text={description}
                />
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img" aria-label="star">⭐</span>
                        ))
                    }
                </div>
            </div>       
            <img src={image} alt="products logo" onClick="" />
            <button onClick={addToBasket} className="add-to-btn">
                Add to Basket
            </button>
        </div>
    )
}

export default Product