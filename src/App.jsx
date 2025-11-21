import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import Navbar from './components/Layout/Navbar'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Splash from './pages/Splash'
import Dashboard from './pages/Dashboard'
import Wallet from './pages/Wallet'
import Strategies from './pages/Strategies'
import Chat from './pages/Chat'
import Settings from './pages/Settings'
import CLTechConsole from './pages/CLTechConsole'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen bg-cyber-dark text-white">
            <Navbar />
            <main className="min-h-screen pt-16">
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                } />
                <Route path="/strategies" element={
                  <ProtectedRoute>
                    <Strategies />
                  </ProtectedRoute>
                } />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/cl-tech-console" element={
                  <ProtectedRoute>
                    <CLTechConsole />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
