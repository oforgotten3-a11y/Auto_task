import { io } from 'socket.io-client'

const SOCKETS = {
  clTech: io(import.meta.env.VITE_CL_TECH_SOCKET_URL, {
    autoConnect: false,
    auth: (cb) => {
      const token = localStorage.getItem('auth_token')
      cb({ token })
    }
  }),
  autoTask: io(import.meta.env.VITE_AUTOTASK_SOCKET_URL, {
    autoConnect: false,
    auth: (cb) => {
      const token = localStorage.getItem('auth_token')
      cb({ token })
    }
  })
}

// Socket event handlers
const setupSocketEvents = (socket, backendName) => {
  socket.on('connect', () => {
    console.log(`✅ Connected to ${backendName} socket`)
  })

  socket.on('disconnect', () => {
    console.log(`❌ Disconnected from ${backendName} socket`)
  })

  socket.on('error', (error) => {
    console.error(`${backendName} socket error:`, error)
  })
}

// Setup events for both sockets
setupSocketEvents(SOCKETS.clTech, 'CL Tech')
setupSocketEvents(SOCKETS.autoTask, 'AutoTask')

export const { clTech: clTechSocket, autoTask: autoTaskSocket } = SOCKETS

// Helper to get current active socket
export const getActiveSocket = (currentBackend) => {
  return currentBackend === 'CL_TECH' ? clTechSocket : autoTaskSocket
}

// Connect/disconnect helpers
export const connectSocket = (backend) => {
  const socket = getActiveSocket(backend)
  socket.connect()
}

export const disconnectSocket = (backend) => {
  const socket = getActiveSocket(backend)
  socket.disconnect()
        }
