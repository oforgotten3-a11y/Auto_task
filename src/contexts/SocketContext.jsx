import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getActiveSocket } from '../services/socket'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [realTimeData, setRealTimeData] = useState({})
  const { currentBackend } = useAuth()

  useEffect(() => {
    const socket = getActiveSocket(currentBackend)

    const onConnect = () => {
      setIsConnected(true)
      console.log('Socket connected')
    }

    const onDisconnect = () => {
      setIsConnected(false)
      console.log('Socket disconnected')
    }

    const onChatMessage = (data) => {
      setChatMessages(prev => [...prev, data])
    }

    const onStrategyUpdate = (data) => {
      setRealTimeData(prev => ({
        ...prev,
        strategies: { ...prev.strategies, [data.id]: data }
      }))
    }

    const onWalletUpdate = (data) => {
      setRealTimeData(prev => ({
        ...prev,
        wallet: data
      }))
    }

    const onElectionUpdate = (data) => {
      setRealTimeData(prev => ({
        ...prev,
        elections: data
      }))
    }

    const onSystemUpdate = (data) => {
      setRealTimeData(prev => ({
        ...prev,
        system: data
      }))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('new-message', onChatMessage)
    socket.on('strategy-update', onStrategyUpdate)
    socket.on('wallet-update', onWalletUpdate)
    socket.on('election-update', onElectionUpdate)
    socket.on('system-update', onSystemUpdate)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('new-message', onChatMessage)
      socket.off('strategy-update', onStrategyUpdate)
      socket.off('wallet-update', onWalletUpdate)
      socket.off('election-update', onElectionUpdate)
      socket.off('system-update', onSystemUpdate)
    }
  }, [currentBackend])

  const sendMessage = (messageData) => {
    const socket = getActiveSocket(currentBackend)
    socket.emit('send-message', messageData)
  }

  const startStrategy = (strategyId) => {
    const socket = getActiveSocket(currentBackend)
    socket.emit('start-strategy', { strategyId })
  }

  const stopStrategy = (strategyId) => {
    const socket = getActiveSocket(currentBackend)
    socket.emit('stop-strategy', { strategyId })
  }

  const value = {
    isConnected,
    chatMessages,
    realTimeData,
    sendMessage,
    startStrategy,
    stopStrategy,
    socket: getActiveSocket(currentBackend)
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
      }
