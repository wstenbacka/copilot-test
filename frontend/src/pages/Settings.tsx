import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { authAPI } from '../utils/api'
import { removeToken } from '../utils/auth'

export default function Settings({ isDarkTheme, setIsDarkTheme }: any) {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '', new_password_confirm: '' })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile()
      setProfile(response.data)
    } catch (error) {
      toast.error('Failed to load profile')
    }
  }

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authAPI.changePassword(passwordData)
      toast.success('Password changed!')
      setPasswordData({ old_password: '', new_password: '', new_password_confirm: '' })
    } catch (error) {
      toast.error('Failed to change password')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header onLogout={handleLogout} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <main style={{ flex: 1, padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }}>
          <h2>Profile</h2>
          {profile && (
            <>
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
            </>
          )}
        </div>

        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Current Password</label>
              <input type="password" value={passwordData.old_password} onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })} required />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>New Password</label>
              <input type="password" value={passwordData.new_password} onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} required />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Confirm Password</label>
              <input type="password" value={passwordData.new_password_confirm} onChange={(e) => setPasswordData({ ...passwordData, new_password_confirm: e.target.value })} required />
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      </main>
    </div>
  )
}
