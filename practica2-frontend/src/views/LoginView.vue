<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-5">
      <div class="card shadow">
        <div class="card-header bg-primary text-white text-center py-3">
          <h4 class="mb-0">Iniciar Sesión</h4>
        </div>
        <div class="card-body p-4">
          <div v-if="errorMsg" class="alert alert-danger py-2">{{ errorMsg }}</div>
          
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Correo Electrónico:</label>
              <input v-model="form.email" type="email" class="form-control" required placeholder="correo@ejemplo.com">
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña:</label>
              <input v-model="form.password" type="password" class="form-control" required placeholder="********">
            </div>
            <button type="submit" class="btn btn-primary w-100 fw-bold" :disabled="authStore.loading">
              <span v-if="authStore.loading" class="spinner-border spinner-border-sm me-1"></span>
              Ingresar al Sistema
            </button>
          </form>
          <div class="text-center mt-3">
            <router-link to="/register">¿No tienes cuenta? Regístrate aquí</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'LoginView',
  setup() { return { authStore: useAuthStore() } },
  data() {
    return { form: { email: '', password: '' }, errorMsg: '' }
  },
  methods: {
    async handleLogin() {
      this.errorMsg = ''
      try {
        await this.authStore.login(this.form)
        this.$router.push({ name: 'dashboard' })
      } catch (err) {
        this.errorMsg = err
      }
    }
  }
}
</script>