<template>
  <div class="mt-4" style="font-family: sans-serif; padding: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="font-weight: bold; margin: 0; color: #333;">📦 Catálogo de Productos</h2>
      <div>
        <input 
          v-model="busqueda" 
          type="text" 
          placeholder="🔍 Buscar producto por nombre..."
          style="padding: 10px; width: 280px; border-radius: 6px; border: 2px solid #007bff; outline: none; font-size: 14px;"
        >
      </div>
    </div>

    <div v-if="productosFiltrados.length === 0" style="padding: 15px; background-color: #fff3cd; color: #856404; border-radius: 4px; border: 1px solid #ffeeba; font-weight: bold;">
      ⚠️ No se encontraron productos que coincidan con "{{ busqueda }}".
    </div>

    <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
      <div v-for="producto in productosFiltrados" :key="producto.id" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; color: #007bff; font-size: 18px; margin-bottom: 10px;">{{ producto.nombre }}</h3>
        <p style="color: #666; font-size: 14px; line-height: 1.4; height: 40px; overflow: hidden;">{{ producto.descripcion }}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          <h4 style="color: #28a745; margin: 0; font-size: 20px;">${{ producto.precio.toFixed(2) }}</h4>
          <span style="font-size: 12px; color: #777; background: #f1f1f1; padding: 3px 8px; border-radius: 12px;">Stock: {{ producto.stock }}</span>
        </div>
        <router-link 
          :to="'/catalogo/' + producto.id" 
          style="display: block; text-align: center; background: #007bff; color: white; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 15px;"
        >
          Ver Detalles del Producto ➡️
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogoView',
  data() {
    return {
      busqueda: '',
      productos: [
        {
          id: 1,
          nombre: 'Lápiz Técnico HB',
          descripcion: 'Lápiz de grafito de alta calidad ideal para dibujo técnico y bosquejos arquitectónicos.',
          precio: 15.50,
          stock: 120
        },
        {
          id: 2,
          nombre: 'Cuaderno Profesional Raya',
          descripcion: 'Cuaderno de 100 hojas con espiral metálico doble y pastas duras protectoras.',
          precio: 45.00,
          stock: 85
        },
        {
          id: 3,
          nombre: 'Memoria USB 64GB Kingston',
          descripcion: 'Unidad flash USB 3.2 de alta velocidad ideal para resguardar proyectos integradores.',
          precio: 189.00,
          stock: 40
        }
      ]
    }
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