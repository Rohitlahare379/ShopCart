import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import productService from '../services/productService'

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sort, setSort] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Fetch initial category list once
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await productService.getAllProducts()
        if (data && data.products) {
          const uniqueCategories = [...new Set(data.products.map((p) => p.category))]
          setCategories(uniqueCategories)
        }
      } catch (err) {
        // Handled in main query
      }
    }
    loadCategories()
  }, [])

  // Fetch filtered & sorted products
  useEffect(() => {
    let isMounted = true

    async function getProducts() {
      setIsLoading(true)
      setHasError(false)

      try {
        const data = await productService.getAllProducts({
          search,
          category: selectedCategory,
          sort,
        })
        if (isMounted) {
          setProducts(data.products || [])
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

    getProducts()

    return () => {
      isMounted = false
    }
  }, [search, selectedCategory, sort, retryCount])

  function handleClearFilters() {
    setSearch('')
    setSelectedCategory('')
    setSort('')
  }

  function handleRetry() {
    setRetryCount((prev) => prev + 1)
  }

  return (
    <section className="products-page">
      <div className="products-heading">
        <p className="eyebrow">ShopKart Catalog</p>
        <h1>Discover Our Products</h1>
        <p className="intro">Browse our curated selection of high-quality gear and accessories.</p>
      </div>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        sort={sort}
        onSortChange={setSort}
        onClearFilters={handleClearFilters}
      />

      {isLoading && (
        <div className="status-container">
          <div className="spinner" aria-hidden="true"></div>
          <p className="status-message">Loading products...</p>
        </div>
      )}

      {hasError && !isLoading && (
        <div className="status-container error-banner" role="alert">
          <p className="error-text">Something went wrong while loading products.</p>
          <button type="button" className="primary-button retry-button" onClick={handleRetry}>
            Retry Request
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <div className="status-container empty-state">
          <h2>No products found.</h2>
          <p>We couldn't find any products matching your search or filter criteria.</p>
          {(search || selectedCategory || sort) && (
            <button type="button" className="primary-button" onClick={handleClearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
