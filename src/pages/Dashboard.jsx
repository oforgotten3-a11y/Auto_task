import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user, currentBackend } = useAuth()

  const stats = currentBackend === 'CL_TECH' ? [
    { label: 'Total Admins', value: '12', color: 'blue', icon: '👥' },
    { label: 'Active Systems', value: '8', color: 'purple', icon: '🌍' },
  ] : [
    { label: 'Balance', value: '$2,450', color: 'green', icon: '💰' },
    { label: 'Active Bots', value: '5', color: 'blue', icon: '⚡' },
  ]

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
          Welcome, {user?.name || user?.email}
        </h1>
        <p className="text-gray-400 text-sm">
          {currentBackend === 'AUTOTASK' ? 'Trading Dashboard' : 'System Overview'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-cyber-card backdrop-blur-lg border border-cyber-blue/30 rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <p className="text-white font-bold text-lg">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-cyber-card backdrop-blur-lg border border-cyber-blue/30 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-cyber-blue">
          {currentBackend === 'AUTOTASK' ? 'Recent Activity' : 'System Status'}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
            <div>
              <p className="text-white text-sm">
                {currentBackend === 'AUTOTASK' ? 'Strategy Executed' : 'System Updated'}
              </p>
              <p className="text-gray-400 text-xs">2 minutes ago</p>
            </div>
            <span className="text-cyber-green text-sm">Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-cyber-card backdrop-blur-lg border border-cyber-purple/30 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-cyber-purple">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg py-3 px-4 text-cyber-blue text-sm hover:bg-cyber-blue/30 transition-colors">
            {currentBackend === 'AUTOTASK' ? 'Start Bot' : 'View Admins'}
          </button>
          <button className="bg-cyber-pink/20 border border-cyber-pink/30 rounded-lg py-3 px-4 text-cyber-pink text-sm hover:bg-cyber-pink/30 transition-colors">
            {currentBackend === 'AUTOTASK' ? 'Deposit' : 'Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
