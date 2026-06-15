import axios from 'axios'
import { getToken } from './auth'

const API_BASE_URL = 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const authAPI = {
  register: (data: any) => apiClient.post('/users/register/', data),
  login: (data: any) => apiClient.post('/api-token-auth/', data),
  getProfile: () => apiClient.get('/users/profile/'),
  changePassword: (data: any) => apiClient.post('/users/change_password/', data),
}

export const taskListAPI = {
  getAll: () => apiClient.get('/tasks/lists/all_lists/'),
  create: (data: any) => apiClient.post('/tasks/lists/', data),
  update: (id: number, data: any) => apiClient.put(`/tasks/lists/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/tasks/lists/${id}/`),
}

export const taskAPI = {
  create: (data: any) => apiClient.post('/tasks/', data),
  markComplete: (id: number) => apiClient.post(`/tasks/${id}/mark_complete/`),
  markActive: (id: number) => apiClient.post(`/tasks/${id}/mark_active/`),
  softDelete: (id: number) => apiClient.post(`/tasks/${id}/soft_delete/`),
}
