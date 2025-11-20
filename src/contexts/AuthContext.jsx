import React, { createContext, useContext, useState, useEffect } from 'react'
import { clTech, autoTask, BACKENDS } from '../services/api'
import { connectSocket, disconnectSocket } from '../services/sockets'

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
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('auth_token')
    const savedBackend = localStorage.getItem('current_backend')
    
    if (token && savedBackend) {
      setCurrentBackend(savedBackend)
      await verifyToken(savedBackend)
    } else {
      setLoading(false)
    }
  }

  const verifyToken = async (backend) => {
    try {
      let userData
      if (backend === 'CL_TECH') {
        userData = await clTech.auth.profile()
      } else {
        userData = await autoTask.auth.profile()
      }
      
      setUser(userData.data.user)
      connectSocket(backend)
    } catch (error) {
      console.error('Token verification failed:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password, userType, backend = 'AUTOTASK') => {
    try {
      let response
      
      if (backend === 'CL_TECH') {
        response = await clTech.auth.login({ email, password, userType })
      } else {
        response = await autoTask.auth.login({ email, password })
      }
      
      const { token, user: userData } = response.data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('current_backend', backend)
      
      setUser(userData)
      setCurrentBackend(backend)
      connectSocket(backend)
      
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (userData, backend = 'AUTOTASK') => {
    try {
      let response
      
      if (backend === 'CL_TECH') {
        response = await clTech.auth.register(userData)
      } else {
        response = await autoTask.auth.register(userData)
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_backend')
    setUser(null)
    setCurrentBackend('AUTOTASK')
    disconnectSocket(currentBackend)
  }

  const switchBackend = async (backend) => {
    if (backend === currentBackend) return
    
    disconnectSocket(currentBackend)
    setCurrentBackend(backend)
    localStorage.setItem('current_backend', backend)
    
    // Verify token for new backend
    await verifyToken(backend)
  }

  const value = {
    // State
    user,
    currentBackend,
    loading,
    
    // Backend info
    BACKENDS,
    
    // Methods
    login,
    register,
    logout,
    switchBackend,
    
    // Helpers
    isAuthenticated: !!user,
    isFounder: user?.type === 'founder',
    isAdmin: user?.type === 'admin' || user?.type === 'founder',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

  
