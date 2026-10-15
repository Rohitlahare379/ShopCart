import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import productService from '../services/productService'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [addedMessage, setAddedMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function getProduct() {
      setIsLoading(true)
      setHasError(false)
      try {
        const data = await productService.getProductById(id)
        if (isMounted) {
          setProduct(data.product)
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    getProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <section className="product-details-page">
        <div className="status-container">
          <div className="spinner" aria-hidden="true"></div>
          <p className="status-message">Loading product details...</p>
        </div>
      </section>
    )
  }

  if (hasError || !product) {
    return (
      <section className="product-details-page">
        <div className="status-container error-banner">
          <h2>Product Not Found</h2>
          <p>We couldn't retrieve the details for this item.</p>
          <Link className="primary-button link-button" to="/products">
            ← Back to Products
          </Link>
        </div>
      </section>
    )
  }

  const isInStock = product.stock > 0

  function handleQuantityChange(delta) {
    setQuantity((prev) => {
      const next = prev + delta
      if (next < 1) return 1
      if (next > product.stock) return product.stock
      return next
    })
  }

  function handleAddToCart() {
    if (!isInStock) return
    setAddedMessage(`Added ${quantity} item(s) of "${product.name}" to cart!`)
    setTimeout(() => {
      setAddedMessage('')
    }, 3500)
  }

  return (
    <section className="product-details-page">
      <div className="product-details-wrapper">
        <Link className="back-link" to="/products">
          ← Back to Catalog
        </Link>

        <article className="product-details-card">
          <div className="product-image-container">
            <img className="product-details-image" src={product.image} alt={product.name} />
          </div>

          <div className="product-details-content">
            <span className="product-category-tag">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-price">₹{product.price.toLocaleString('en-IN')}</p>

            <div className="stock-info">
              <span className={isInStock ? 'stock-status in-stock' : 'stock-status out-of-stock'}>
                ● {isInStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {isInStock && (
              <div className="quantity-section">
                <label htmlFor="quantity-control">Quantity:</label>
                <div className="quantity-controls" id="quantity-control">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              className="primary-button add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              {isInStock ? 'Add to Cart' : 'Currently Unavailable'}
            </button>

            {addedMessage && (
              <p className="success-toast" role="status">
                ✓ {addedMessage}
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProductDetails
