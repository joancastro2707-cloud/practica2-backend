<template>
  <div>
    <h2 class="fw-bold text-dark">Resumen del Sistema</h2>
    <p class="text-muted">Bienvenido de vuelta, administrador general.</p>
    <div class="row mt-4 gap-3 px-2">
      <div class="card bg-light border col p-3 shadow-sm">
        <h6 class="text-secondary fw-bold text-uppercase">Sesión Autorizada por Pinia</h6>
        <p class="mb-0 font-monospace text-success fw-bold">Usuario activo: {{ authStore.user?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'
export default {
  name: 'Dashboard',
  setup() { return { authStore: useAuthStore() } }
}
</script>