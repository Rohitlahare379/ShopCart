import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Home() {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.get('/customers/me')
        setCustomer(response.data)
      } catch (error) {
        navigate('/login', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    getCustomer()
  }, [navigate])

  if (loading) {
    return (
      <section className="home-page">
        <div className="welcome-card">
          <p className="eyebrow">ShopKart</p>
          <h1>Loading your account...</h1>
        </div>
      </section>
    )
  }

  if (!customer) {
    return null
  }

  return (
    <section className="home-page">
      <div className="welcome-card">
        <p className="eyebrow">ShopKart Customer Portal</p>
        <h1>Welcome, {customer.fullName}!</h1>
        <div className="customer-details">
          <p>You are signed in with <strong>{customer.email}</strong>.</p>
          <p>Phone: <strong>{customer.phone}</strong></p>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link className="primary-button link-button" to="/products">
            Explore Product Catalog →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
