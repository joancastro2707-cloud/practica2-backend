import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    // Recupera los datos guardados previamente en el navegador, si no hay, inicia vacío
    items: JSON.parse(localStorage.getItem('carrito') || '[]')
  }),

  getters: {
    // Cuenta la cantidad total de artículos físicos en el carrito
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.cantidad, 0),
    
    // Calcula el costo total de la compra multiplicando precio por cantidad
    totalPrecio: (state) => state.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    
    // Devuelve cuántas piezas de un mismo producto hay añadidas actualmente
    cantidadDeProducto: (state) => (id) => {
      const item = state.items.find(i => i.id === id)
      return item ? item.cantidad : 0
    }
  },

  actions: {
    // 4.2: Agrega un producto o incrementa su cantidad si ya existe
    agregar(producto) {
      const existe = this.items.find(item => item.id === producto.id)
      if (existe) {
        existe.cantidad++
      } else {
        // Guardamos una copia del producto agregando la propiedad de cantidad inicializada en 1
        this.items.push({ ...producto, cantidad: 1 })
      }
      this.guardarEnStorage()
    },

    // Elimina por completo un artículo sin importar cuántas piezas tenga
    eliminarDelCarrito(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.guardarEnStorage()
    },

    // Controla los botones + y - de la vista del carrito
    cambiarCantidad(id, cantidad) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.cantidad = cantidad
        // Si la cantidad llega a 0 o menos, lo removemos automáticamente
        if (item.cantidad <= 0) {
          this.eliminarDelCarrito(id)
        }
      }
      this.guardarEnStorage()
    },

    // Limpia todo el carrito
    vaciar() {
      this.items = []
      this.guardarEnStorage()
    },

    // Sincroniza de forma manual o automática los cambios en el LocalStorage
    guardarEnStorage() {
      localStorage.setItem('carrito', JSON.stringify(this.items))
    }
  }
})