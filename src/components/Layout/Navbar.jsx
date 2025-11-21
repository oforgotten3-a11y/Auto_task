import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, logout, currentBackend } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (location.pathname === '/') return null

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    ...(currentBackend === 'AUTOTASK' ? [
      { path: '/wallet', label: 'Wallet', icon: '💰' },
      { path: '/strategies', label: 'Strategies', icon: '🤖' },
    ] : []),
    { path: '/chat', label: 'Chat', icon: '💬' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    ...(currentBackend === 'CL_TECH' && user?.type === 'founder' ? [
      { path: '/cl-tech-console', label: 'CL Console', icon: '🔬' },
    ] : []),
  ]

  return (
    <nav className="glass-morphism border-b border-cyber-blue/30 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
              {currentBackend === 'AUTOTASK' ? 'AutoTask' : 'CL Tech'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Info & Controls */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">
                {user?.name || user?.email}
              </span>
              <span className="text-xs text-cyber-blue bg-cyber-blue/20 px-2 py-1 rounded capitalize">
                {user?.type}
              </span>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-cyber-blue/20 border border-cyber-blue/30 hover:bg-cyber-blue/30 transition-colors"
            >
              <span className="text-white">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
            
            <button
              onClick={logout}
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-cyber-blue/20 pt-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* User info in mobile */}
              <div className="px-4 py-3 border-t border-white/10 mt-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                  <span className="text-sm text-gray-300 truncate">
                    {user?.name || user?.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-center px-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
