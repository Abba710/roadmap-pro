import { Navigate } from 'react-router-dom'
import type { User } from '../types/user'

interface ProtectedRouteProps {
  user: User | null
  children: React.ReactNode
  loading?: boolean
}

export default function ProtectedRoute({
  user,
  children,
  loading,
}: ProtectedRouteProps) {
  if (!user && !loading) return <Navigate to="/" replace />
  return children
}
