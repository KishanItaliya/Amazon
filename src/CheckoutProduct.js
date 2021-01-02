import { Translate } from '@material-ui/icons'
import React, {useState} from 'react'
import { limitToScale } from 'react-currency-format/lib/utils'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'

function CheckoutProduct({ id, title, price, image, rating, hideButton, product_id }) {
    
    const [{basket}, dispatch] = useStateValue()
    const [animation, setAnimation] = useState(false)
    const removeFromBasket = () => {
        setAnimation(true)
        dispatch({
            type: "REMOVE_FROM_BASKET",
            product_id: product_id
        })
    }
    
    return (
        <div className={animation?'checkoutProduct animation':'checkoutProduct'}>
            <img className="checkoutProduct__image" src={image} alt="checkout_product"/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img" aria-label="star">⭐</span>
                        ))
                    }
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
              
            </div>
        </div>
    )
}

export default CheckoutProduct