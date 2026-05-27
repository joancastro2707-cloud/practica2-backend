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
              <input v-model="form.email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña:</label>
              <input v-model="form.password" type="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100 fw-bold">Ingresar</button>
          </form>
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
  data() { return { form: { email: '', password: '' }, errorMsg: '' } },
  methods: {
    async handleLogin() {
      this.errorMsg = ''
      try {
        await this.authStore.login(this.form)
        // Paso 4.8: Redirección post-login inteligente
        const destino = this.$route.query.redirect || '/admin'
        this.$router.push(destino)
      } catch (err) {
        this.errorMsg = err
      }
    }
  }
}
</script>