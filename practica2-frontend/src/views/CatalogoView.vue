<template>
  <div class="mt-4" style="font-family: sans-serif; padding: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="font-weight: bold; margin: 0; color: #333;">📦 Catálogo de Productos</h2>
      <input 
        v-model="busqueda" 
        type="text" 
        placeholder="🔍 Buscar producto por nombre..."
        style="padding: 10px; width: 280px; border-radius: 6px; border: 2px solid #007bff; outline: none;"
      >
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
      <div v-for="producto in productosFiltrados" :key="producto.id" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; color: #007bff; font-size: 18px;">{{ producto.nombre }}</h3>
        <p style="color: #666; font-size: 14px; height: 40px; overflow: hidden;">{{ producto.descripcion }}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h4 style="color: #28a745; margin: 0; font-size: 20px;">${{ producto.precio.toFixed(2) }}</h4>
          <span style="font-size: 12px; color: #777;">Stock: {{ producto.stock }}</span>
        </div>

        <button 
          @click="carrito.agregar(producto)"
          style="width: 100%; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 10px; transition: 0.2s;"
          :style="carrito.cantidadDeProducto(producto.id) > 0 ? 'background: #28a745; color: white;' : 'background: #ffc107; color: #333;'"
        >
          <span v-if="carrito.cantidadDeProducto(producto.id) > 0">
            ✓ En carrito ({{ carrito.cantidadDeProducto(producto.id) }})
          </span>
          <span v-else>
            🛒 Agregar al carrito
          </span>
        </button>

        <router-link 
          :to="'/catalogo/' + producto.id" 
          style="display: block; text-align: center; background: #e9ecef; color: #333; padding: 8px; border-radius: 6px; text-decoration: none; font-size: 14px;"
        >
          Ver Detalles
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarritoStore } from '../stores/carrito'

export default {
  name: 'CatalogoView',
  data() {
    return {
      busqueda: '',
      productos: [
        { id: 1, nombre: 'Lápiz Técnico HB', descripcion: 'Lápiz de grafito de alta calidad ideal para dibujo técnico.', precio: 15.50, stock: 120 },
        { id: 2, nombre: 'Cuaderno Profesional Raya', descripcion: 'Cuaderno de 100 hojas con espiral metálico doble.', precio: 45.00, stock: 85 },
        { id: 3, nombre: 'Memoria USB 64GB Kingston', descripcion: 'Unidad flash USB 3.2 de alta velocidad.', precio: 189.00, stock: 40 }
      ]
    }
  },
  setup() {
    const carrito = useCarritoStore()
    return { carrito }
  },
  computed: {
    productosFiltrados() {
      return this.productos.filter(p => 
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  }
}
</script>