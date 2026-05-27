<template>
  <div class="mt-4">
    <div class="jumbotron bg-white p-5 rounded shadow-sm border">
      <h1 class="display-5 text-primary fw-bold">¡Bienvenido al Panel Control!</h1>
      <p class="lead text-muted">Has ingresado de manera segura a la ruta privada utilizando un Bearer Token emitido por Laravel Sanctum.</p>
      <hr class="my-4">
      
      <div class="card bg-light border-0 col-md-6">
        <div class="card-body">
          <h5 class="card-title fw-bold text-dark">Datos de la Sesión Activa (Pinia State)</h5>
          <p class="card-text mb-1"><strong>Nombre de usuario:</strong> {{ authStore.user?.name }}</p>
          <p class="card-text mb-1"><strong>Correo de acceso:</strong> {{ authStore.user?.email }}</p>
          <p class="card-text text-truncate"><strong>Token Bearer activo:</strong> <span class="badge bg-secondary font-monospace">{{ authStore.token }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'DashboardView',
  setup() { return { authStore: useAuthStore() } }
}
</script>