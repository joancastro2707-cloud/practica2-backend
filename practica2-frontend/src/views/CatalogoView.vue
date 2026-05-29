<template>
  <div style="font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh; padding: 20px;">
    <div style="max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
        <h2 style="color: #1a73e8; margin: 0; font-size: 28px;">📦 Catálogo de Productos</h2>
        <router-link to="/admin" style="background: #34a853; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">+ Agregar Producto</router-link>
      </div>

      <div v-if="cargando" style="text-align: center; padding: 40px;">
        <div class="loader"></div>
        <p style="color: #666; margin-top: 15px; font-size: 16px;">Consultando a la API de Laravel...</p>
      </div>

      <div v-else>
        <div v-if="productos.length === 0" style="background-color: #fff3cd; color: #856404; padding: 20px; border-radius: 8px; text-align: center; font-size: 16px; border: 1px solid #ffeeba;">
          No hay productos registrados en la base de datos. ¡Registra el primero en el Panel de Administración!
        </div>

        <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
          <div v-for="producto in productos" :key="producto.id" style="background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.2s;">
            <img 
              :src="producto.imagen_url || 'https://via.placeholder.com/200'" 
              :alt="producto.nombre"
              style="max-width: 100%; height: 180px; object-fit: contain; margin-bottom: 15px; border-radius: 8px;"
            />
            <h3 style="margin: 10px 0; font-size: 20px; color: #333; font-weight: 600;">{{ producto.nombre }}</h3>
            <p style="color: #666; font-size: 14px; height: 42px; overflow: hidden; line-height: 1.4; margin-bottom: 15px;">{{ producto.descripcion }}</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 10px; border-radius: 8px; margin-top: 10px;">
              <span style="color: #28a745; font-weight: bold; font-size: 22px;">${{ producto.precio }}</span>
              <span style="font-size: 13px; color: #777; background: #e9ecef; padding: 4px 8px; border-radius: 4px;">Stock: {{ producto.stock }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
const cargando = ref(false)

const cargarProductos = async () => {
  cargando.value = true
  try {
    // Intenta consumir desde el endpoint de tu API en Laravel
    const res = await axios.get('/api/productos')
    if (res.data.data) {
      productos.value = res.data.data
    } else {
      productos.value = res.data
    }
  } catch (error) {
    console.error("Error al conectar con Laravel:", error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  cargarProductos()
})
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a73e8;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>