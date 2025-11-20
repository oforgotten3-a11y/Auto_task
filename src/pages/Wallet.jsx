import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import { autoTask } from '../services/api'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion, AnimatePresence } from 'framer-motion'

const Wallet = () => {
  const { currentBackend } = useAuth()
  const { realTimeData } = useSocket()
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (currentBackend === 'AUTOTASK') {
      loadWalletData()
    }
  }, [currentBackend])

  useEffect(() => {
    if (realTimeData.wallet) {
      setBalance(realTimeData.wallet.balance)
    }
  }, [realTimeData.wallet])

  const loadWalletData = async () => {
    try {
      const [balanceData, transactionsData] = await Promise.all([
        autoTask.wallet.balance(),
        autoTask.wallet.transactions()
      ])
      
      setBalance(balanceData.data?.balance || 0)
      setTransactions(transactionsData.data?.transactions || [])
    } catch (error) {
      console.error('Failed to load wallet data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeposit = async () => {
    // Implement deposit logic
    setShowDeposit(false)
    setAmount('')
  }

  const handleWithdraw = async () => {
    // Implement withdraw logic
    setShowWithdraw(false)
    setAmount('')
  }

  if (currentBackend !== 'AUTOTASK') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <NeonCard glowColor="purple" className="text-center py-12">
          <div className="text-6xl mb-4">🔬</div>
          <h2 className="text-2xl font-bold text-cyber-purple mb-2">
            Wallet Feature
          </h2>
          <p className="text-gray-400">
            This feature is only available in AutoTask backend.
          </p>
          <p className="text-sm text-cyber-blue mt-2">
            Switch to AutoTask backend to access wallet functionality.
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
          Crypto Wallet
        </h1>
        <p className="text-gray-400 mt-2">Manage your funds and transactions</p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        <NeonCard glowColor="green" className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Balance</p>
              <p className="text-4xl sm:text-5xl font-bold text-cyber-green mb-2">
                ${balance.toLocaleString()}
              </p>
              <p className="text-cyber-blue text-sm">+12.5% this month</p>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <NeonButton 
                onClick={() => setShowDeposit(true)}
                variant="primary"
                size="sm"
              >
                💰 Deposit
              </NeonButton>
              <NeonButton 
                onClick={() => setShowWithdraw(true)}
                variant="secondary"
                size="sm"
              >
                🏧 Withdraw
              </NeonButton>
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="blue">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available</span>
              <span className="text-white font-semibold">${balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">In Trade</span>
              <span className="text-cyber-blue font-semibold">$2,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Profit Today</span>
              <span className="text-cyber-green font-semibold">+$324</span>
            </div>
          </div>
        </NeonCard>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <NeonCard glowColor="purple">
          <h3 className="text-xl font-semibold mb-6">📋 Transaction History</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {transactions.length > 0 ? transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5 hover:border-cyber-blue/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'deposit' ? 'bg-cyber-green/20' : 
                      transaction.type === 'withdrawal' ? 'bg-cyber-pink/20' : 'bg-cyber-blue/20'
                    }`}>
                      {transaction.type === 'deposit' ? '⬇️' : 
                       transaction.type === 'withdrawal' ? '⬆️' : '💸'}
                    </div>
                    <div>
                      <p className="text-white font-medium capitalize">
                        {transaction.type} {transaction.currency}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'deposit' ? 'text-cyber-green' : 
                      transaction.type === 'withdrawal' ? 'text-cyber-pink' : 'text-cyber-blue'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed' ? 'text-cyber-green' :
                      transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-4">💸</div>
                  <p className="text-gray-400">No transactions yet</p>
                  <p className="text-sm text-cyber-blue mt-1">Your transaction history will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </NeonCard>
      </motion.div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDeposit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeposit(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-card border border-cyber-blue/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-cyber-blue">💰 Deposit Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  />
                </div>
                <div className="flex space-x-3">
                  <NeonButton onClick={handleDeposit} className="flex-1">
                    Deposit
                  </NeonButton>
                  <NeonButton 
                    variant="secondary" 
                    onClick={() => setShowDeposit(false)}
                    className="flex-1"
                  >
                    Cancel
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdraw && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowWithdraw(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-card border border-cyber-pink/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-cyber-pink">🏧 Withdraw Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-pink/30 rounded-lg focus:border-cyber-pink focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Wallet Address</label>
                  <input
                    type="text"
                    placeholder="Enter your crypto address"
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-pink/30 rounded-lg focus:border-cyber-pink focus:outline-none text-white"
                  />
                </div>
                <div className="flex space-x-3">
                  <NeonButton onClick={handleWithdraw} className="flex-1">
                    Withdraw
                  </NeonButton>
                  <NeonButton 
                    variant="secondary" 
                    onClick={() => setShowWithdraw(false)}
                    className="flex-1"
                  >
                    Cancel
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Wallet
