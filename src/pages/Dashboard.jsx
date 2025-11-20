import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import { clTech, autoTask } from '../services/api'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { currentBackend, user, BACKENDS } = useAuth()
  const { realTimeData, isConnected } = useSocket()
  const [stats, setStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [currentBackend])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      if (currentBackend === 'CL_TECH') {
        // CL Tech dashboard data
        const [systemData, adminData] = await Promise.all([
          clTech.system.status(),
          clTech.admin.list()
        ])

        setStats([
          { 
            label: 'Total Admins', 
            value: systemData.data.totalAdmins || '12', 
            change: '+2', 
            color: 'blue',
            icon: '👥'
          },
          { 
            label: 'Active Countries', 
            value: systemData.data.activeCountries || '8', 
            change: '+1', 
            color: 'purple',
            icon: '🌍'
          },
          { 
            label: 'System Status', 
            value: systemData.data.status || 'Operational', 
            change: 'Stable', 
            color: 'green',
            icon: '🟢'
          },
          { 
            label: 'Your Access', 
            value: user?.type === 'founder' ? 'Founder' : 'Admin', 
            change: user?.rank ? `Level ${user.rank}` : '', 
            color: 'pink',
            icon: '🔐'
          }
        ])

        setRecentActivity([
          { id: 1, action: 'System Initialized', time: '2 mins ago', user: 'System', type: 'system' },
          { id: 2, action: 'New Admin Registered', time: '5 mins ago', user: 'AutoBot', type: 'user' },
          { id: 3, action: 'Election Started: US', time: '1 hour ago', user: 'Admin_01', type: 'election' },
        ])
      } else {
        // AutoTask dashboard data
        const [walletData, strategiesData] = await Promise.all([
          autoTask.wallet.balance(),
          autoTask.strategies.list()
        ])

        const activeBots = strategiesData.data?.filter(s => s.status === 'running').length || 0

        setStats([
          { 
            label: 'Total Balance', 
            value: `$${(walletData.data?.balance || 0).toLocaleString()}`, 
            change: '+12.5%', 
            color: 'green',
            icon: '💰'
          },
          { 
            label: 'Active Bots', 
            value: activeBots.toString(), 
            change: '+2', 
            color: 'blue',
            icon: '⚡'
          },
          { 
            label: 'Success Rate', 
            value: '94.2%', 
            change: '+3.1%', 
            color: 'purple',
            icon: '📈'
          },
          { 
            label: 'Running Time', 
            value: '1,248h', 
            change: '+48h', 
            color: 'pink',
            icon: '⏱️'
          }
        ])

        setRecentActivity([
          { id: 1, action: 'Strategy #BTC-001 Executed', profit: '+$245', time: '2 mins ago', type: 'profit' },
          { id: 2, action: 'Bot #ETH-005 Started', profit: '', time: '5 mins ago', type: 'info' },
          { id: 3, action: 'Withdrawal Processed', profit: '-$1,000', time: '1 hour ago', type: 'withdrawal' },
        ])
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
          {BACKENDS[currentBackend].name} Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.name || user?.email}. {isConnected ? '🟢 Live data connected' : '🔴 Connecting...'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <NeonCard key={index} glowColor={stat.color} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className={`text-${stat.color}-400 text-sm font-medium`}>
                  {stat.change}
                </p>
              </div>
              <div className="text-2xl opacity-70">
                {stat.icon}
              </div>
            </div>
          </NeonCard>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Analytics Chart */}
        <motion.div variants={itemVariants}>
          <NeonCard glowColor="blue" className="h-80">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">
                {currentBackend === 'CL_TECH' ? '📊 System Analytics' : '💹 Earnings Overview'}
              </span>
            </h3>
            <div className="h-56 bg-black/20 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {currentBackend === 'CL_TECH' 
                    ? 'CL Tech Performance Metrics' 
                    : 'Real-time Trading Analytics'
                  }
                </p>
                <p className="text-cyber-blue text-xs mt-2">Live data streaming enabled</p>
              </div>
              
              {/* Mock chart bars */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between space-x-1">
                {[30, 50, 70, 90, 60, 40, 80, 60].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyber-blue to-cyber-pink rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </NeonCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <NeonCard glowColor="pink" className="h-80">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <span>🔄 Recent Activity</span>
              <span className="text-sm text-gray-400 font-normal">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{activity.action}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                      {activity.user && (
                        <p className="text-cyber-blue text-xs">by {activity.user}</p>
                      )}
                    </div>
                  </div>
                  {activity.profit && (
                    <span className={`text-sm font-semibold ${
                      activity.profit.startsWith('+') ? 'text-cyber-green' : 
                      activity.profit.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {activity.profit}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </NeonCard>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <NeonCard glowColor="purple">
          <h3 className="text-xl font-semibold mb-4">🚀 Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentBackend === 'CL_TECH' ? (
              <>
                <NeonButton variant="secondary" size="sm">
                  👥 Manage Admins
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  🌍 Start Election
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  📊 System Report
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  🔧 Settings
                </NeonButton>
              </>
            ) : (
              <>
                <NeonButton variant="secondary" size="sm">
                  ⚡ Start Bot
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  💰 Deposit
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  📈 Analytics
                </NeonButton>
                <NeonButton variant="secondary" size="sm">
                  ⚙️ Settings
                </NeonButton>
              </>
            )}
          </div>
        </NeonCard>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
