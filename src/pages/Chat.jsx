import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import NeonCard from '../components/Layout/NeonCard'
import NeonButton from '../components/UI/NeonButton'
import { motion, AnimatePresence } from 'framer-motion'

const Chat = () => {
  const { user, currentBackend } = useAuth()
  const { chatMessages, sendMessage, isConnected } = useSocket()
  const [message, setMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [activeChannel, setActiveChannel] = useState('general')
  const messagesEndRef = useRef(null)

  const channels = [
    { id: 'general', name: '💬 General', backend: 'BOTH' },
    { id: 'trading', name: '📈 Trading', backend: 'AUTOTASK' },
    { id: 'support', name: '🛟 Support', backend: 'BOTH' },
    { id: 'elections', name: '🗳️ Elections', backend: 'CL_TECH' },
    { id: 'admin', name: '🔐 Admin', backend: 'CL_TECH' },
  ]

  const filteredChannels = channels.filter(channel => 
    channel.backend === 'BOTH' || channel.backend === currentBackend
  )

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && isConnected) {
      sendMessage({
        text: message,
        channel: activeChannel,
        user: user.name || user.email,
        timestamp: new Date().toISOString(),
        backend: currentBackend
      })
      setMessage('')
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <NeonCard glowColor="blue" className="h-full flex flex-col">
            {/* Online Status */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-cyber-green animate-pulse' : 'bg-red-400'
                }`} />
                <span className="text-sm text-gray-400">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-white font-medium truncate">{user.name || user.email}</p>
                <p className="text-cyber-blue text-sm capitalize">{user.type}</p>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4 text-cyber-blue">Channels</h3>
              <div className="space-y-2">
                {filteredChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      activeChannel === channel.id
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {channel.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Online Users */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-cyber-green">
                Online Users ({onlineUsers.length})
              </h3>
              <div className="space-y-2">
                {onlineUsers.map((onlineUser) => (
                  <div key={onlineUser.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                    <span className="text-sm text-gray-300 truncate">
                      {onlineUser.name}
                    </span>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <p className="text-gray-400 text-sm">No users online</p>
                )}
              </div>
            </div>
          </NeonCard>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 flex flex-col"
        >
          <NeonCard glowColor="purple" className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {filteredChannels.find(c => c.id === activeChannel)?.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {currentBackend === 'AUTOTASK' ? 'AutoTask Community' : 'CL Tech Network'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isConnected ? 'bg-cyber-green' : 'bg-red-400'
                  }`} />
                  <span className="text-sm text-gray-400">
                    {chatMessages.filter(m => m.channel === activeChannel).length} messages
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              <AnimatePresence>
                {chatMessages
                  .filter(msg => msg.channel === activeChannel && msg.backend === currentBackend)
                  .map((msg, index) => (
                    <motion.div
                      key={msg.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${
                        msg.user === (user.name || user.email) ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.user === (user.name || user.email)
                            ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
                            : 'bg-cyber-card border border-white/10 text-gray-300'
                        }`}
                      >
                        {msg.user !== (user.name || user.email) && (
                          <p className="text-xs font-medium text-cyber-blue mb-1">
                            {msg.user}
                          </p>
                        )}
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.user === (user.name || user.email) 
                            ? 'text-blue-100' 
                            : 'text-gray-400'
                        }`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
              <div ref={messagesEndRef} />
              
              {/* Empty State */}
              {chatMessages.filter(msg => msg.channel === activeChannel && msg.backend === currentBackend).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-cyber-purple mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-gray-400">
                    Be the first to start a conversation in this channel!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isConnected 
                    ? `Type a message in #${activeChannel}...` 
                    : 'Connecting to chat...'
                }
                disabled={!isConnected}
                className="flex-1 px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg focus:border-cyber-blue focus:outline-none text-white disabled:opacity-50"
              />
              <NeonButton
                type="submit"
                disabled={!message.trim() || !isConnected}
                variant="primary"
              >
                Send
              </NeonButton>
            </form>
          </NeonCard>
        </motion.div>
      </div>
    </div>
  )
}

export default Chat
