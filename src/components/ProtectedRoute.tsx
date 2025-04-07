// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('user_token') 
  
//   console.log(token)

  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
