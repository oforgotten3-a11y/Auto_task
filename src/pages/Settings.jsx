import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion } from 'framer-motion'

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'en',
    theme: 'cyberpunk',
    notifications: true,
    twoFactor: false
  })

  const tabs = [
    { id: 'profile', name: '👤 Profile', icon: '👤' },
    { id: 'security', name: '🔒 Security', icon: '🔒' },
    { id: 'preferences', name: '⚙️ Preferences', icon: '⚙️' },
    { id: 'notifications', name: '🔔 Notifications', icon: '🔔' },
  ]

  const handleSave = () => {
    // Implement save logic
    console.log('Saving settings:', formData)
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
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and security</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <NeonCard glowColor="blue">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </NeonCard>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <NeonCard glowColor="purple">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-cyber-blue">Profile Settings</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">User Type</label>
                        <div className="px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg text-white capitalize">
                          {user?.type}
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Member Since</label>
                        <div className="px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg text-white">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-cyber-green">Security Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                        <div>
                          <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                          <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.twoFactor}
                            onChange={(e) => setFormData({...formData, twoFactor: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green"></div>
                        </label>
                      </div>

                      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                        <h3 className="text-white font-medium mb-2">Change Password</h3>
                        <div className="space-y-3">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-4 py-2 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-2 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-2 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-cyber-pink">Preferences</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Language</label>
                        <select
                          value={formData.language}
                          onChange={(e) => setFormData({...formData, language: e.target.value})}
                          className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Theme</label>
                        <select
                          value={formData.theme}
                          onChange={(e) => setFormData({...formData, theme: e.target.value})}
                          className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                        >
                          <option value="cyberpunk">Cyberpunk</option>
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Time Zone</label>
                      <select className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white">
                        <option value="utc">UTC</option>
                        <option value="est">EST</option>
                        <option value="pst">PST</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-cyber-purple">Notification Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-gray-400 text-sm">Receive important updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notifications}
                            onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                          <h4 className="text-white font-medium mb-2">Trading Alerts</h4>
                          <p className="text-gray-400 text-sm">Strategy executions and results</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                          <h4 className="text-white font-medium mb-2">Security Alerts</h4>
                          <p className="text-gray-400 text-sm">Login attempts and security events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <NeonButton onClick={handleSave} variant="primary" className="w-full sm:w-auto">
                💾 Save Changes
              </NeonButton>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
