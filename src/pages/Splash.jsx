import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'

const Splash = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { login, register, BACKENDS } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'admin',
    backend: 'AUTOTASK'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.userType, formData.backend)
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          userType: formData.userType
        }, formData.backend)
        // After registration, login automatically
        await login(formData.email, formData.password, formData.userType, formData.backend)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  // Animated background particles
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-900 to-cyber-dark relative overflow-hidden">
      <Particles />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-cyber-blue/10 rounded-full blur-xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-cyber-pink/10 rounded-full blur-xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <NeonCard glowColor={formData.backend === 'CL_TECH' ? 'purple' : 'blue'} className="text-center">
            {/* Header */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-purple bg-clip-text text-transparent mb-2">
                {BACKENDS[formData.backend].name}
              </h1>
              <p className="text-gray-300 text-sm">Next Generation Cyberpunk Platform</p>
            </motion.div>

            {/* Backend Selector */}
            <div className="mb-6">
              <select
                value={formData.backend}
                onChange={(e) => setFormData({...formData, backend: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white text-center cursor-pointer"
              >
                <option value="AUTOTASK">🚀 AutoTask Trading System</option>
                <option value="CL_TECH">🔬 CL Tech Research Platform</option>
              </select>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white placeholder-gray-400"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>

              {formData.backend === 'CL_TECH' && (
                <div>
                  <select
                    value={formData.userType}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="founder">Founder</option>
                  </select>
                </div>
              )}

              <NeonButton
                type="submit"
                disabled={loading}
                className="w-full py-4"
                variant="primary"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  isLogin ? 'Login to System' : 'Create Account'
                )}
              </NeonButton>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-cyber-blue hover:text-cyber-pink transition-colors text-sm"
              >
                {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
              </button>
            </div>
          </NeonCard>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-gray-400 text-xs"
          >
            <p>Secure • Encrypted • Next Generation</p>
            <p className="mt-1">v{import.meta.env.VITE_APP_VERSION}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Splash
