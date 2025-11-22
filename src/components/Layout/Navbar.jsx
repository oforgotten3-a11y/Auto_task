import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext' // Fixed import path

const Navbar = () => {
  const { user, logout, currentBackend } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (location.pathname === '/') return null

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ]

  return (
    <nav className="bg-cyber-card backdrop-blur-lg border-b border-cyber-blue/30 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
              AutoTask
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Info & Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-cyber-blue/20 border border-cyber-blue/30"
            >
              ☰
            </button>
            <button
              onClick={logout}
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg hover:opacity-90 transition-opacity text-sm"
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
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all block ${
                    location.pathname === item.path
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={logout}
                className="w-full text-left px-3 py-3 rounded-lg bg-gradient-to-r from-cyber-pink to-cyber-purple hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
