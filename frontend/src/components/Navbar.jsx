import { Link, NavLink, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Navbar() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await api.post('/customers/logout')
    } finally {
      navigate('/login')
    }
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/home">ShopKart</Link>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default Navbar
