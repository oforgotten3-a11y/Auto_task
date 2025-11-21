import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Splash = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    backend: 'AUTOTASK'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password, 'user', formData.backend)
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-900 to-cyber-dark relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-cyber-card backdrop-blur-lg border border-cyber-blue/30 rounded-xl p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-purple bg-clip-text text-transparent mb-2">
              {formData.backend === 'AUTOTASK' ? 'AutoTask' : 'CL Tech'}
            </h1>
            <p className="text-gray-300 text-sm">Cyberpunk Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <select
                value={formData.backend}
                onChange={(e) => setFormData({...formData, backend: e.target.value})}
                className="w-full px-4 py-3 bg-black/30 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white text-sm"
              >
                <option value="AUTOTASK">🚀 AutoTask System</option>
                <option value="CL_TECH">🔬 CL Tech System</option>
              </select>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-black/30 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white placeholder-gray-400 text-sm"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-black/30 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white placeholder-gray-400 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyber-blue to-cyber-pink py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyber-blue hover:text-cyber-pink transition-colors text-sm"
            >
              {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
