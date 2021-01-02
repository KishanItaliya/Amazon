import React, {useState, useEffect} from 'react'
import './Home.css';
import Product from './Product';
import ReactNotification from 'react-notifications-component';
import {db} from './firebase';

function Home() {

    const [products, setProducts] = useState([]);
    
    useEffect(() => { 
        db.collection('products').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    console.log('>>>>>>>>>>', products[0]?.data);

    return (
        <div className="home">
            <ReactNotification />
            <div className="home__container">
                <img 
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt="home logo"
                />

                {/* <div className="home__row">
                    <Product product={products[0]} />
                    <Product product={products[1]} />
                </div> */}

                {/* <div className="home__row">
                <Product product={products[2]} />
                <Product product={products[3]} />
                <Product product={products[4]} />
                    
                </div>

                <div className="home__row">
                <Product product={products[5]} />
                </div> */}
            </div>
        </div>
    )
}

export default Home
