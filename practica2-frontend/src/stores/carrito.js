import { defineStore } from 'pinia'

public const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('carrito_final') || '[]')
  }),
  getters: {
    totalPrecio: (state) => state.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
    totalProductos: (state) => state.items.reduce((acc, item) => acc + item.cantidad, 0)
  },
  actions: {
    agregar(producto) {
      const existe = this.items.find(i => i.id === producto.id)
      if (existe) {
        if (existe.cantidad < producto.stock) existe.cantidad++
      } else {
        this.items.push({ ...producto, cantidad: 1 })
      }
      this.guardarSincronizacion()
    },
    cambiarCantidad(id, cantidad) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        if (cantidad <= 0) {
          this.eliminarDelCarrito(id)
        } else {
          item.cantidad = cantidad
        }
      }
      this.guardarSincronizacion()
    },
    eliminarDelCarrito(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.guardarSincronizacion()
    },
    cantidadDeProducto(id) {
      const item = this.items.find(i => i.id === id)
      return item ? item.cantidad : 0
    },
    vaciar() {
      this.items = []
      this.guardarSincronizacion()
    },
    guardarSincronizacion() {
      localStorage.setItem('carrito_final', JSON.stringify(this.items))
    }
  }
})