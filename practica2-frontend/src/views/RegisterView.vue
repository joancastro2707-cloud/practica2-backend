<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-header bg-success text-white text-center py-3">
          <h4 class="mb-0">Registro de Usuario</h4>
        </div>
        <div class="card-body p-4">
          <div v-if="Object.keys(errors).length" class="alert alert-danger py-2">
            <ul class="mb-0 ps-3">
              <li v-for="(err, index) in errors" :key="index">{{ err[0] }}</li>
            </ul>
          </div>

          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label">Nombre Completo:</label>
              <input v-model="form.name" type="text" class="form-control" required placeholder="Juan Pérez">
            </div>
            <div class="mb-3">
              <label class="form-label">Correo Electrónico:</label>
              <input v-model="form.email" type="email" class="form-control" required placeholder="correo@ejemplo.com">
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña:</label>
              <input v-model="form.password" type="password" class="form-control" required placeholder="Mínimo 8 caracteres">
            </div>
            <div class="mb-3">
              <label class="form-label">Confirmar Contraseña:</label>
              <input v-model="form.password_confirmation" type="password" class="form-control" required placeholder="********">
            </div>
            <button type="submit" class="btn btn-success w-100 fw-bold" :disabled="authStore.loading">
              <span v-if="authStore.loading" class="spinner-border spinner-border-sm me-1"></span>
              Crear Cuenta e Iniciar Sesión
            </button>
          </form>
          <div class="text-center mt-3">
            <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'RegisterView',
  setup() { return { authStore: useAuthStore() } },
  data() {
    return { form: { name: '', email: '', password: '', password_confirmation: '' }, errors: {} }
  },
  methods: {
    async handleRegister() {
      this.errors = {}
      try {
        await this.authStore.register(this.form)
        this.$router.push({ name: 'dashboard' })
      } catch (err) {
        if (typeof err === 'object') this.errors = err
      }
    }
  }
}
</script>