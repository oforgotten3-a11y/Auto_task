import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [currentBackend, setCurrentBackend] = useState('AUTOTASK')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token')
    const savedBackend = localStorage.getItem('current_backend')
    
    if (token && savedBackend) {
      setCurrentBackend(savedBackend)
      // In a real app, you would verify the token with your backend
      setUser({ email: 'user@example.com', name: 'Demo User' })
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType, backend = 'AUTOTASK') => {
    // Simulate login - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = { email, name: 'Demo User', type: userType }
        localStorage.setItem('auth_token', 'demo-token')
        localStorage.setItem('current_backend', backend)
        setUser(userData)
        setCurrentBackend(backend)
        resolve({ data: { user: userData, token: 'demo-token' } })
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_backend')
    setUser(null)
    setCurrentBackend('AUTOTASK')
  }

  const value = {
    user,
    currentBackend,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
  }
