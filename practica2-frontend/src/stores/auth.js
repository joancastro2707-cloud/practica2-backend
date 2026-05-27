import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const response = await axios.post('/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        return { success: true }
      } catch (error) {
        throw error.response?.data?.message || 'Error en el inicio de sesión'
      } finally {
        this.loading = false
      }
    },
    async register(userData) {
      this.loading = true
      try {
        const response = await axios.post('/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        return { success: true }
      } catch (error) {
        throw error.response?.data?.errors || 'Error en el registro'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        await axios.post('/logout')
      } catch (error) {
        console.error('Error al revocar token en servidor', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }
})