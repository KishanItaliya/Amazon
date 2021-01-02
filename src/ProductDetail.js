import React from 'react';
import './ProductDetail.css';

function ProductDetail({product}) {
 
    return (
        <div className='productDetail'>
            <h1>{product.data.title}</h1>
        </div>
    )
}

export default ProductDetail
