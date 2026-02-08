import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available (for future auth implementation)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// ===== NOTES API =====

export const getNotes = async (params = {}) => {
  const response = await api.get('/notes', { params })
  return response.data.data.notes
}

export const getNote = async (id) => {
  const response = await api.get(`/notes/${id}`)
  return response.data.data.note
}

export const createNote = async (data) => {
  const response = await api.post('/notes', data)
  return response.data.data.note
}

export const updateNote = async (id, data) => {
  const response = await api.put(`/notes/${id}`, data)
  return response.data.data.note
}

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`)
  return response.data
}

// ===== BOOKMARKS API =====

export const getBookmarks = async (params = {}) => {
  const response = await api.get('/bookmarks', { params })
  return response.data.data.bookmarks
}

export const getBookmark = async (id) => {
  const response = await api.get(`/bookmarks/${id}`)
  return response.data.data.bookmark
}

export const createBookmark = async (data) => {
  const response = await api.post('/bookmarks', data)
  return response.data.data.bookmark
}

export const updateBookmark = async (id, data) => {
  const response = await api.put(`/bookmarks/${id}`, data)
  return response.data.data.bookmark
}

export const deleteBookmark = async (id) => {
  const response = await api.delete(`/bookmarks/${id}`)
  return response.data
}

// ===== AUTH API (Bonus - for future implementation) =====

export const register = async (data) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const login = async (data) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data.data.user
}

export default api