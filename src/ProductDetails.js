import React, {useEffect, useState} from 'react';
import {db} from './firebase';
import ProductDetail from './ProductDetail';

function ProductDetails() {

    const [products, setProducts] = useState([]);
    
    useEffect(() => { 
        db.collection('products').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    return (
        <div>
            {products?.map(product => (
                    <ProductDetail product={product} />
            ))}
        </div>  
    )
}

export default ProductDetails
