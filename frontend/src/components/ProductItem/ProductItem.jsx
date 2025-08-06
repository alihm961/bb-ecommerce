import React from 'react'
import './ProductItems.css'
import { useNavigate, Link } from 'react-router-dom'

const ProductItem = ({id, name, img, price}) => {  
  return (
    <Link className='linkk' to={`/product/${id}`}>
      <div className='product-item-container'>
        <h3>{name}</h3>
        <img src={`http://localhost:8000/storage/${img}`} alt="product-image" />
        <p>${price}</p>
    </div>
    </Link>
  )
}

export default ProductItem