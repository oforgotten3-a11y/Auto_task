import axios from 'axios'

// Backend configurations
export const BACKENDS = {
  CL_TECH: {
    baseURL: import.meta.env.VITE_CL_TECH_API_URL || 'https://cltech-backend.onrender.com/api',
    socketURL: import.meta.env.VITE_CL_TECH_SOCKET_URL || 'https://cltech-backend.onrender.com',
    name: 'CL Tech',
    color: 'purple'
  },
  AUTOTASK: {
    baseURL: import.meta.env.VITE_AUTOTASK_API_URL || 'https://autotask-backend-bsum.onrender.com/api',
    socketURL: import.meta.env.VITE_AUTOTASK_SOCKET_URL || 'https://autotask-backend-bsum.onrender.com',
    name: 'AutoTask',
    color: 'blue'
  }
}

// Create separate axios instances
export const clTechAPI = axios.create({
  baseURL: BACKENDS.CL_TECH.baseURL,
})

export const autoTaskAPI = axios.create({
  baseURL: BACKENDS.AUTOTASK.baseURL,
})

// Auth interceptors for both APIs
[clTechAPI, autoTaskAPI].forEach(api => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('current_backend')
        window.location.href = '/'
      }
      return Promise.reject(error)
    }
  )
})

// CL Tech API methods
export const clTech = {
  auth: {
    login: (credentials) => clTechAPI.post('/auth/login', credentials),
    register: (userData) => clTechAPI.post('/auth/register', userData),
    profile: () => clTechAPI.get('/auth/profile'),
    logout: () => clTechAPI.post('/auth/logout'),
  },
  admin: {
    list: () => clTechAPI.get('/admins'),
    create: (data) => clTechAPI.post('/admins', data),
    upgradeRequest: (data) => clTechAPI.post('/upgrade-requests', data),
  },
  elections: {
    list: () => clTechAPI.get('/elections/countries'),
    start: (country, data) => clTechAPI.post(`/elections/countries/${country}/start-election`, data),
    results: (country) => clTechAPI.get(`/elections/countries/${country}/results`),
  },
  system: {
    status: () => clTechAPI.get('/system/status'),
    initialize: () => clTechAPI.post('/system/initialize'),
    theories: () => clTechAPI.get('/system/theories'),
    simulations: () => clTechAPI.get('/system/simulations'),
  },
  vault: {
    access: () => clTechAPI.get('/vault/access'),
    documents: () => clTechAPI.get('/vault/documents'),
  }
}

// AutoTask API methods
export const autoTask = {
  auth: {
    login: (credentials) => autoTaskAPI.post('/auth/login', credentials),
    register: (userData) => autoTaskAPI.post('/auth/register', userData),
    profile: () => autoTaskAPI.get('/auth/profile'),
    logout: () => autoTaskAPI.post('/auth/logout'),
  },
  strategies: {
    list: () => autoTaskAPI.get('/strategies'),
    create: (data) => autoTaskAPI.post('/strategies', data),
    run: (id) => autoTaskAPI.post(`/strategies/${id}/run`),
    stop: (id) => autoTaskAPI.post(`/strategies/${id}/stop`),
    stats: (id) => autoTaskAPI.get(`/strategies/${id}/stats`),
  },
  wallet: {
    balance: () => autoTaskAPI.get('/wallet/balance'),
    transactions: () => autoTaskAPI.get('/wallet/transactions'),
    withdraw: (data) => autoTaskAPI.post('/wallet/withdraw', data),
    deposit: (data) => autoTaskAPI.post('/wallet/deposit', data),
  },
  analytics: {
    overview: () => autoTaskAPI.get('/analytics/overview'),
    earnings: (period) => autoTaskAPI.get(`/analytics/earnings?period=${period}`),
  }
    }
