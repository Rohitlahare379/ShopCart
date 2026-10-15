import { Link } from 'react-router-dom'

function WishlistCard({ product, onRemove }) {
  const isInStock = product.stock > 0

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
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <Link className="details-button" style={{ flex: 1 }} to={`/products/${product._id}`}>View</Link>
          <button 
            type="button" 
            className="secondary-button" 
            style={{ flex: 1, borderColor: '#fca5a5', color: '#dc2626' }}
            onClick={() => onRemove(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}

export default WishlistCard
