<template>
  <div style="font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto;">
    <router-link to="/catalogo" style="text-decoration: none; color: #007bff; font-weight: bold;">⬅️ Volver al Catálogo</router-link>
    
    <div v-if="producto" style="border: 1px solid #ddd; border-radius: 12px; padding: 30px; margin-top: 20px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <span style="font-size: 12px; color: #888; text-uppercase; font-weight: bold;">ID Producto: {{ $route.params.id }}</span>
      <h2 style="color: #333; margin-top: 5px;">{{ producto.nombre }}</h2>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #555; font-size: 16px; line-height: 1.6;">{{ producto.descripcion }}</p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; background: #f8f9fa; padding: 15px; border-radius: 8px;">
        <div>
          <span style="font-size: 14px; color: #666; display: block;">Precio al público</span>
          <h3 style="color: #28a745; margin: 0; font-size: 28px;">${| producto.precio.toFixed(2) |}</h3>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 14px; color: #666; display: block;">Disponibilidad</span>
          <span style="font-weight: bold; color: #333; font-size: 18px;">{{ producto.stock }} piezas</span>
        </div>
      </div>
    </div>
    
    <div v-else style="margin-top: 20px; padding: 20px; background: #f8d7da; color: #721c24; border-radius: 8px;">
      Buscando información del producto...
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoDetalle',
  data() {
    return {
      producto: null,
      // Respaldo local idéntico para que la simulación de la ruta dinámica funcione al 100%
      respaldo: [
        { id: 1, nombre: 'Lápiz Técnico HB', descripcion: 'Lápiz de grafito de alta calidad ideal para dibujo técnico y bosquejos arquitectónicos.', precio: 15.50, stock: 120 },
        { id: 2, nombre: 'Cuaderno Profesional Raya', descripcion: 'Cuaderno de 100 hojas con espiral metálico doble y pastas duras protectoras.', precio: 45.00, stock: 85 },
        { id: 3, nombre: 'Memoria USB 64GB Kingston', descripcion: 'Unidad flash USB 3.2 de alta velocidad ideal para resguardar proyectos integradores.', precio: 189.00, stock: 40 }
      ]
    }
  },
  mounted() {
    const idBuscar = parseInt(this.$route.params.id);
    // Busca directamente en el arreglo local
    const encontrado = this.respaldo.find(p => p.id === idBuscar);
    if (encontrado) {
      this.producto = encontrado;
    }
  }
}
</script>