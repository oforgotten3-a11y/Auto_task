import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, logout, currentBackend, switchBackend, BACKENDS, isFounder } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname === '/') return null

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', backend: 'BOTH' },
    { path: '/wallet', label: 'Wallet', icon: '💰', backend: 'AUTOTASK' },
    { path: '/strategies', label: 'Strategies', icon: '⚡', backend: 'AUTOTASK' },
    { path: '/chat', label: 'Chat', icon: '💬', backend: 'BOTH' },
    { path: '/settings', label: 'Settings', icon: '⚙️', backend: 'BOTH' },
  ]

  if (currentBackend === 'CL_TECH' && isFounder) {
    navItems.push({ path: '/cl-tech', label: 'CL Tech', icon: '🔬', backend: 'CL_TECH' })
  }

  const filteredNavItems = navItems.filter(item => 
    item.backend === 'BOTH' || item.backend === currentBackend
  )

  const handleBackendSwitch = (backend) => {
    switchBackend(backend)
    navigate('/dashboard')
  }

  return (
    <nav className="glass-morphism border-b border-cyber-blue/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Backend Selector */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg flex items-center justify-center"
              >
                <span className="text-black font-bold text-lg">A</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
                  {BACKENDS[currentBackend].name}
                </h1>
                <p className="text-xs text-gray-400">Cyberpunk Platform</p>
              </div>
            </Link>

            <div className="relative">
              <select
                value={currentBackend}
                onChange={(e) => handleBackendSwitch(e.target.value)}
                className="px-3 py-2 bg-black/50 border border-cyber-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-blue appearance-none cursor-pointer"
              >
                <option value="AUTOTASK">🚀 AutoTask</option>
                <option value="CL_TECH">🔬 CL Tech</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <span className="text-cyber-blue">▼</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 neon-glow-blue'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 hover:border hover:border-cyber-blue/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.email}</p>
              <p className="text-xs text-cyber-blue capitalize">{user?.type || 'user'}</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-cyber-pink/50"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
