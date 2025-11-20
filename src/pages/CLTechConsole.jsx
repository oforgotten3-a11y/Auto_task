import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { clTech } from '../services/api'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion } from 'framer-motion'

const CLTechConsole = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('theories')
  const [theories, setTheories] = useState([])
  const [simulations, setSimulations] = useState([])
  const [vaultData, setVaultData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConsoleData()
  }, [activeTab])

  const loadConsoleData = async () => {
    try {
      setLoading(true)
      
      if (activeTab === 'theories') {
        const response = await clTech.system.theories()
        setTheories(response.data?.theories || [])
      } else if (activeTab === 'simulations') {
        const response = await clTech.system.simulations()
        setSimulations(response.data?.simulations || [])
      } else if (activeTab === 'vault') {
        const response = await clTech.vault.documents()
        setVaultData(response.data?.documents || [])
      }
    } catch (error) {
      console.error('Failed to load console data:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'theories', name: '🧠 Theories', icon: '🧠' },
    { id: 'simulations', name: '🌐 Simulations', icon: '🌐' },
    { id: 'vault', name: '🔐 Vault', icon: '🔐' },
    { id: 'code', name: '💻 Code Lux', icon: '💻' },
  ]

  if (user?.type !== 'founder') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <NeonCard glowColor="purple" className="text-center py-12">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-cyber-purple mb-2">
            Access Denied
          </h2>
          <p className="text-gray-400">
            CL Tech Console is restricted to founders only.
          </p>
          <p className="text-sm text-cyber-blue mt-2">
            You need founder privileges to access this section.
          </p>
        </NeonCard>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center">
            <span className="text-2xl">🔬</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">
              CL Tech Console
            </h1>
            <p className="text-gray-400">Founder-only research and development panel</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-cyber-blue">
          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
          <span>Founder Access • Secure Connection • Research Mode</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-1 bg-cyber-card rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyber-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'theories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeonCard glowColor="purple" className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-cyber-purple mb-6">Research Theories</h2>
              <div className="space-y-4">
                {theories.map((theory, index) => (
                  <div
                    key={theory.id || index}
                    className="p-4 bg-black/20 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/60 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{theory.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        theory.status === 'proven' ? 'bg-cyber-green/20 text-cyber-green' :
                        theory.status === 'testing' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-cyber-blue/20 text-cyber-blue'
                      }`}>
                        {theory.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{theory.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cyber-blue">Complexity: {theory.complexity}/10</span>
                      <span className="text-gray-400">Created: {theory.createdDate}</span>
                    </div>
                  </div>
                ))}
                
                {theories.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🧪</div>
                    <h3 className="text-xl font-semibold text-cyber-purple mb-2">
                      No Theories Yet
                    </h3>
                    <p className="text-gray-400">Start developing new research theories</p>
                  </div>
                )}
              </div>
            </NeonCard>

            <NeonCard glowColor="blue">
              <h3 className="text-xl font-semibold text-cyber-blue mb-4">New Theory</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Theory Title"
                  className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                />
                <textarea
                  placeholder="Theory Description"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white resize-none"
                />
                <NeonButton variant="primary" className="w-full">
                  🚀 Create Theory
                </NeonButton>
              </div>
            </NeonCard>

            <NeonCard glowColor="pink">
              <h3 className="text-xl font-semibold text-cyber-pink mb-4">Research Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Theories</span>
                  <span className="text-white">{theories.filter(t => t.status === 'testing').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Proven Theories</span>
                  <span className="text-cyber-green">{theories.filter(t => t.status === 'proven').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-cyber-blue">78.5%</span>
                </div>
              </div>
            </NeonCard>
          </div>
        )}

        {activeTab === 'simulations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <NeonCard glowColor="blue" className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-cyber-blue mb-6">System Simulations</h2>
              <div className="space-y-4">
                {simulations.map((sim, index) => (
                  <div
                    key={sim.id || index}
                    className="p-4 bg-black/20 rounded-lg border border-cyber-blue/30 hover:border-cyber-blue/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{sim.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          sim.status === 'running' ? 'bg-cyber-green/20 text-cyber-green' :
                          sim.status === 'completed' ? 'bg-cyber-purple/20 text-cyber-purple' :
                          'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {sim.status}
                        </span>
                        <span className="text-xs text-gray-400">{sim.progress}%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{sim.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cyber-pink">Nodes: {sim.nodes}</span>
                      <span className="text-gray-400">Duration: {sim.duration}</span>
                    </div>
                    {sim.status === 'running' && (
                      <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyber-blue to-cyber-pink h-2 rounded-full transition-all duration-500"
                          style={{ width: `${sim.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </NeonCard>

            <div className="space-y-6">
              <NeonCard glowColor="green">
                <h3 className="text-xl font-semibold text-cyber-green mb-4">New Simulation</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Simulation Name"
                    className="w-full px-4 py-2 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none text-white"
                  />
                  <select className="w-full px-4 py-2 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none text-white">
                    <option>Select Type</option>
                    <option>Quantum Analysis</option>
                    <option>Market Prediction</option>
                    <option>System Optimization</option>
                  </select>
                  <NeonButton variant="primary" className="w-full">
                    🌟 Start Simulation
                  </NeonButton>
                </div>
              </NeonCard>

              <NeonCard glowColor="pink">
                <h3 className="text-xl font-semibold text-cyber-pink mb-4">Simulation Controls</h3>
                <div className="space-y-3">
                  <NeonButton variant="secondary" className="w-full">
                    ⏸️ Pause All
                  </NeonButton>
                  <NeonButton variant="secondary" className="w-full">
                    ⏹️ Stop All
                  </NeonButton>
                  <NeonButton variant="secondary" className="w-full">
                    📊 Generate Report
                  </NeonButton>
                </div>
              </NeonCard>
            </div>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NeonCard glowColor="purple" className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-cyber-purple mb-6">Secure Vault</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vaultData.map((doc, index) => (
                  <div
                    key={doc.id || index}
                    className="p-4 bg-black/20 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/60 transition-colors group cursor-pointer"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {doc.type === 'document' ? '📄' :
                       doc.type === 'code' ? '💻' :
                       doc.type === 'research' ? '🔬' : '🔐'}
                    </div>
                    <h3 className="text-white font-semibold mb-2 truncate">{doc.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{doc.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyber-blue">{doc.size}</span>
                      <span className="text-gray-500">{doc.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </NeonCard>
          </div>
        )}

        {activeTab === 'code' && (
          <NeonCard glowColor="blue" className="min-h-[500px]">
            <h2 className="text-2xl font-semibold text-cyber-blue mb-6">Code Lux Development</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Live Code Editor</h3>
                <div className="bg-black/50 border border-cyber-blue/30 rounded-lg p-4 font-mono text-sm">
                  <div className="text-cyber-pink">// CL Tech Core Systems</div>
                  <div className="text-cyber-blue">function</div>
                  <div className="text-white ml-4">initializeQuantumMatrix()</div>
                  <div className="text-white ml-4">{'{'}</div>
                  <div className="text-cyber-green ml-8">return</div>
                  <div className="text-gray-400 ml-12">// Advanced algorithms</div>
                  <div className="text-white ml-4">{'}'}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">System Output</h3>
                <div className="bg-black/50 border border-cyber-green/30 rounded-lg p-4 font-mono text-sm text-cyber-green h-32 overflow-y-auto">
                  <div>{'>'} System initialized...</div>
                  <div>{'>'} Quantum circuits engaged</div>
                  <div>{'>'} Research matrix active</div>
                  <div>{'>'} All systems operational</div>
                </div>
              </div>
            </div>
          </NeonCard>
        )}
      </motion.div>

      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyber-purple mx-auto mb-4"></div>
            <p className="text-cyber-purple">Loading CL Tech Data...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CLTechConsole
