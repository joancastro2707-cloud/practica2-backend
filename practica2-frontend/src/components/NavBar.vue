<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <span class="navbar-brand fw-bold">🔐 Sanctum Auth — UPTex</span>
      
      <div class="d-flex align-items-center">
        <div v-if="authStore.isAuthenticated" class="d-flex align-items-center">
          <span class="text-white me-3 badge bg-primary">Usuario: {{ authStore.user?.name }}</span>
          <button @click="handleLogout" class="btn btn-sm btn-outline-danger fw-bold">Cerrar Sesión</button>
        </div>
        
        <div v-else>
          <router-link to="/login" class="btn btn-sm btn-outline-light me-2">Login</router-link>
          <router-link to="/register" class="btn btn-sm btn-success">Registro</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'NavBar',
  setup() { return { authStore: useAuthStore() } },
  methods: {
    async handleLogout() {
      await this.authStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>