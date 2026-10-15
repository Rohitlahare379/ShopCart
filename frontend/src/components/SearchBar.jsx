function SearchBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  sort,
  onSortChange,
  onClearFilters,
}) {
  return (
    <div className="product-controls">
      <div className="control-group">
        <label htmlFor="product-search">Search products</label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name (e.g. keyboard, watch)..."
        />
      </div>

      <div className="control-group">
        <label htmlFor="product-category">Category</label>
        <select
          id="product-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="product-sort">Sort by Price</label>
        <select
          id="product-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {(search || category || sort) && onClearFilters && (
        <div className="control-group clear-group">
          <button
            type="button"
            className="secondary-button"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchBar
