import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import WishlistCard from '../components/WishlistCard'
import wishlistService from '../services/wishlistService'

function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function fetchWishlist() {
      setIsLoading(true)
      setHasError(false)

      try {
        const data = await wishlistService.getWishlist()
        if (isMounted) {
          setWishlist(data.wishlist || [])
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

    fetchWishlist()

    return () => {
      isMounted = false
    }
  }, [retryCount])

  async function handleRemove(productId) {
    try {
      await wishlistService.removeFromWishlist(productId)
      setWishlist((prev) => prev.filter((p) => p._id !== productId))
    } catch (error) {
      // Intentionally ignoring specific error handling here to keep it simple,
      // but ideally we'd show a toast or alert if it fails.
      console.error('Failed to remove from wishlist', error)
    }
  }

  function handleRetry() {
    setRetryCount((prev) => prev + 1)
  }

  return (
    <section className="products-page">
      <div className="products-heading">
        <p className="eyebrow">Your Account</p>
        <h1>Saved Items</h1>
        <p className="intro">Manage the products you've saved for later.</p>
      </div>

      {isLoading && (
        <div className="status-container">
          <div className="spinner" aria-hidden="true"></div>
          <p className="status-message">Loading your wishlist...</p>
        </div>
      )}

      {hasError && !isLoading && (
        <div className="status-container error-banner" role="alert">
          <p className="error-text">Something went wrong while loading your wishlist.</p>
          <button type="button" className="primary-button retry-button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !hasError && wishlist.length === 0 && (
        <div className="status-container empty-state">
          <h2>Your wishlist is empty...</h2>
          <p>You haven't saved any items yet. Start exploring our catalog!</p>
          <Link className="primary-button link-button" to="/products">
            Browse Products
          </Link>
        </div>
      )}

      {!isLoading && !hasError && wishlist.length > 0 && (
        <div className="products-grid">
          {wishlist.map((product) => (
            <WishlistCard key={product._id} product={product} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Wishlist
