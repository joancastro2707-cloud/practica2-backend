<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">🔐 Sanctum SPA — UPTex</router-link>
      
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/catalogo" class="nav-link" active-class="active">Catálogo</router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <div v-if="authStore.isAuthenticated" class="d-flex align-items-center">
          <router-link to="/admin" class="btn btn-sm btn-outline-warning me-3">Panel Admin</router-link>
          <span class="text-white me-3 badge bg-primary">Admin: {{ authStore.user?.name }}</span>
          <button @click="handleLogout" class="btn btn-sm btn-outline-danger fw-bold">Cerrar Sesión</button>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-sm btn-outline-light me-2">Login</router-link>
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