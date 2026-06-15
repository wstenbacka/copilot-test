import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />
}
