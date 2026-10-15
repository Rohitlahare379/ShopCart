import api from './api'

export async function getAllProducts(params = {}) {
  const queryParameters = new URLSearchParams()

  if (params.search && params.search.trim()) {
    queryParameters.set('search', params.search.trim())
  }

  if (params.category && params.category.trim()) {
    queryParameters.set('category', params.category.trim())
  }

  if (params.sort && params.sort.trim()) {
    queryParameters.set('sort', params.sort.trim())
  }

  const queryString = queryParameters.toString()
  const response = await api.get(`/products${queryString ? `?${queryString}` : ''}`)
  return response.data
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export async function createProduct(productData) {
  const response = await api.post('/products', productData)
  return response.data
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
}
