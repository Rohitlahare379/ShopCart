import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phone: '' })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setIsSubmitting(true)
    try {
      await api.post('/customers/register', formData)
      navigate('/login')
    } catch (error) {
      setMessage(error.response?.data?.message || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Create your account</p>
        <h1>Join ShopKart</h1>
        <p className="intro">Sign up to start your shopping journey.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} minLength="6" required />
          {message && <p className="form-message" role="alert">{message}</p>}
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="form-footer">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </section>
  )
}

export default Register
