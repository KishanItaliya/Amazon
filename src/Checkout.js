import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import {useStateValue} from './StateProvider';
// import FlipMove from 'react-flip-move';
// import Anime, {anime} from 'react-anime';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

function Checkout() {

    const [{basket, user}] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="checkout__ad"
                /> 
                <div>

                    <h3 className="checkout__email">Hello, {user?.email.substring(0, user?.email.lastIndexOf("@"))}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {/* <FlipMove duration={600} easing='ease-in-out'> */}
                    {/* <Anime delay={anime.stagger(100)} scale={[.1, .9]}> */}
                    <TransitionGroup>
                        {basket.map(item => (
                        // <Anime delay={anime.stagger(100)} scale={[.1, .9]}>
                        <CSSTransition
                            key={item.product_id}
                            timeout={300}
                            classNames="item"
                            >
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                product_id={item.product_id}
                            />
                        </CSSTransition>
                        // </Anime>
                        ))}
                    </TransitionGroup>
                    {/* </Anime> */}
                    {/* </FlipMove> */}
                </div>

            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
