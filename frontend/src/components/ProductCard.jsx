import { useState } from 'react'
import { Link } from 'react-router-dom'
import wishlistService from '../services/wishlistService'

function ProductCard({ product }) {
  const [status, setStatus] = useState('idle') // idle, saving, success, duplicate, error
  const isInStock = product.stock > 0

  async function handleAddWishlist() {
    if (status === 'saving') return
    setStatus('saving')
    try {
      await wishlistService.addToWishlist(product._id)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      if (error.response?.status === 409) {
        setStatus('duplicate')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    }
  }

  return (
    <article className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-card-content">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="product-price">₹{product.price}</p>
        <p className={isInStock ? 'stock-status in-stock' : 'stock-status out-of-stock'}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </p>
        <Link className="details-button" style={{ marginBottom: '0.5rem' }} to={`/products/${product._id}`}>View Details</Link>
        <button 
          type="button" 
          className="secondary-button" 
          style={{ width: '100%' }}
          onClick={handleAddWishlist}
          disabled={status === 'saving'}
        >
          {status === 'idle' && '♡ Add to Wishlist'}
          {status === 'saving' && 'Saving...'}
          {status === 'success' && '✓ Added to Wishlist'}
          {status === 'duplicate' && 'Already in wishlist'}
          {status === 'error' && 'Failed to add'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
