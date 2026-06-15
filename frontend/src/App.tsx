import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Settings from './pages/Settings'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDarkTheme) {
      root.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkTheme])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  )
}

export default App
