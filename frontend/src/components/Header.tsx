import { Link } from 'react-router-dom'

export default function Header({ onLogout, isDarkTheme, setIsDarkTheme }: any) {
  return (
    <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>📋 Task Manager</Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</button>
      </nav>
    </header>
  )
}
