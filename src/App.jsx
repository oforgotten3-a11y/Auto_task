import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Layout/Navbar'
import Splash from './pages/Splash'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'

// Simple version - we'll add more pages once basic navigation works
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-cyber-dark text-white">
          <Navbar />
          <main className="min-h-screen pt-16"> {/* Padding for fixed navbar */}
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
