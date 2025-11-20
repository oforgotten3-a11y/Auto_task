import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import { autoTask } from '../services/api'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion, AnimatePresence } from 'framer-motion'

const Strategies = () => {
  const { currentBackend } = useAuth()
  const { realTimeData, startStrategy, stopStrategy } = useSocket()
  const [strategies, setStrategies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (currentBackend === 'AUTOTASK') {
      loadStrategies()
    }
  }, [currentBackend])

  useEffect(() => {
    if (realTimeData.strategies) {
      setStrategies(prev => 
        prev.map(strategy => 
          realTimeData.strategies[strategy.id] 
            ? { ...strategy, ...realTimeData.strategies[strategy.id] }
            : strategy
        )
      )
    }
  }, [realTimeData.strategies])

  const loadStrategies = async () => {
    try {
      const response = await autoTask.strategies.list()
      setStrategies(response.data?.strategies || [])
    } catch (error) {
      console.error('Failed to load strategies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartStrategy = async (strategyId) => {
    try {
      await startStrategy(strategyId)
      // Optimistic update
      setStrategies(prev => 
        prev.map(s => s.id === strategyId ? { ...s, status: 'running' } : s)
      )
    } catch (error) {
      console.error('Failed to start strategy:', error)
    }
  }

  const handleStopStrategy = async (strategyId) => {
    try {
      await stopStrategy(strategyId)
      // Optimistic update
      setStrategies(prev => 
        prev.map(s => s.id === strategyId ? { ...s, status: 'stopped' } : s)
      )
    } catch (error) {
      console.error('Failed to stop strategy:', error)
    }
  }

  const filteredStrategies = strategies.filter(strategy => {
    if (activeTab === 'all') return true
    if (activeTab === 'running') return strategy.status === 'running'
    if (activeTab === 'stopped') return strategy.status === 'stopped'
    return true
  })

  if (currentBackend !== 'AUTOTASK') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <NeonCard glowColor="purple" className="text-center py-12">
          <div className="text-6xl mb-4">🔬</div>
          <h2 className="text-2xl font-bold text-cyber-purple mb-2">
            Trading Strategies
          </h2>
          <p className="text-gray-400">
            This feature is only available in AutoTask backend.
          </p>
          <p className="text-sm text-cyber-blue mt-2">
            Switch to AutoTask backend to manage trading strategies.
          </p>
        </NeonCard>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
          Trading Strategies
        </h1>
        <p className="text-gray-400 mt-2">Manage your automated trading bots</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <NeonCard glowColor="green" className="text-center">
          <p className="text-gray-400 text-sm mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{strategies.length}</p>
        </NeonCard>
        <NeonCard glowColor="blue" className="text-center">
          <p className="text-gray-400 text-sm mb-1">Running</p>
          <p className="text-2xl font-bold text-cyber-blue">
            {strategies.filter(s => s.status === 'running').length}
          </p>
        </NeonCard>
        <NeonCard glowColor="purple" className="text-center">
          <p className="text-gray-400 text-sm mb-1">Stopped</p>
          <p className="text-2xl font-bold text-cyber-purple">
            {strategies.filter(s => s.status === 'stopped').length}
          </p>
        </NeonCard>
        <NeonCard glowColor="pink" className="text-center">
          <p className="text-gray-400 text-sm mb-1">Profit</p>
          <p className="text-2xl font-bold text-cyber-pink">+12.5%</p>
        </NeonCard>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex space-x-1 bg-cyber-card rounded-lg p-1 w-fit">
          {['all', 'running', 'stopped'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-cyber-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Strategies Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredStrategies.map((strategy) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <NeonCard 
                glowColor={strategy.status === 'running' ? 'green' : 'purple'}
                className="h-full flex flex-col"
              >
                {/* Strategy Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {strategy.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{strategy.pair}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    strategy.status === 'running' 
                      ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                      : 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30'
                  }`}>
                    {strategy.status}
                  </div>
                </div>

                {/* Strategy Info */}
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Profit/Loss:</span>
                    <span className={strategy.profit >= 0 ? 'text-cyber-green' : 'text-red-400'}>
                      {strategy.profit >= 0 ? '+' : ''}{strategy.profit}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Level:</span>
                    <span className={
                      strategy.risk === 'low' ? 'text-cyber-green' :
                      strategy.risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    }>
                      {strategy.risk}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Running Time:</span>
                    <span className="text-white">{strategy.runningTime || '0h'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {strategy.status === 'running' ? (
                    <NeonButton
                      onClick={() => handleStopStrategy(strategy.id)}
                      variant="danger"
                      size="sm"
                      className="flex-1"
                    >
                      🛑 Stop
                    </NeonButton>
                  ) : (
                    <NeonButton
                      onClick={() => handleStartStrategy(strategy.id)}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      🚀 Start
                    </NeonButton>
                  )}
                  <NeonButton
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  >
                    📊 Stats
                  </NeonButton>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredStrategies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full"
          >
            <NeonCard glowColor="blue" className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-cyber-blue mb-2">
                No Strategies Found
              </h3>
              <p className="text-gray-400 mb-4">
                {activeTab === 'all' 
                  ? "You haven't created any trading strategies yet."
                  : `No ${activeTab} strategies found.`
                }
              </p>
              <NeonButton variant="primary">
                Create Your First Strategy
              </NeonButton>
            </NeonCard>
          </motion.div>
        )}
      </motion.div>

      {/* Create New Strategy Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <NeonCard glowColor="pink" className="text-center">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-cyber-pink mb-2">
            Create New Strategy
          </h3>
          <p className="text-gray-400 mb-4">
            Build custom automated trading strategies with our advanced AI
          </p>
          <NeonButton variant="primary" size="lg">
            🚀 Launch Strategy Builder
          </NeonButton>
        </NeonCard>
      </motion.div>
    </div>
  )
}

export default Strategies
