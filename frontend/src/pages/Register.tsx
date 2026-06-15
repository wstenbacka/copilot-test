import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authAPI } from '../utils/api'

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '', password: '', password_confirm: '' })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await authAPI.register(formData)
      toast.success('Registration successful!')
      navigate('/login')
    } catch (error: any) {
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '0.75rem', width: '100%', maxWidth: '400px' }}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Confirm Password</label>
            <input type="password" name="password_confirm" value={formData.password_confirm} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isLoading} style={{ width: '100%' }}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}
