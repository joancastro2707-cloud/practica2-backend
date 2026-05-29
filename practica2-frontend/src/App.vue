<template>
  <nav style="background: #333; padding: 15px; display: flex; justify-content: space-between; align-items: center; font-family: sans-serif;">
    <div>
      <router-link to="/" style="color: white; text-decoration: none; margin-right: 15px; font-weight: bold;">🏠 Inicio</router-link>
      <router-link to="/catalogo" style="color: white; text-decoration: none; margin-right: 15px;">📦 Catálogo</router-link>
    </div>
    
    <div style="display: flex; align-items: center; gap: 20px;">
      <router-link to="/carrito" style="text-decoration: none; position: relative; font-size: 20px;">
        🛒
        <span v-if="carrito.totalItems > 0" style="position: absolute; top: -10px; right: -12px; background: #dc3545; color: white; border-radius: 50%; padding: 2px 7px; font-size: 12px; font-weight: bold;">
          {{ carrito.totalItems }}
        </span>
      </router-link>

      <router-link to="/login" style="color: white; text-decoration: none;">👤 Login</router-link>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { useCarritoStore } from './stores/carrito'

export default {
  setup() {
    const carrito = useCarritoStore()
    return { carrito }
  }
}
</script>