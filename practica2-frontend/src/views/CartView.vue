<template>
  <div style="font-family: sans-serif; padding: 30px; max-width: 900px; margin: 0 auto;">
    <h2 style="font-weight: bold; margin-bottom: 25px; color: #333;">🛒 Tu Carrito de Compras</h2>

    <div v-if="carrito.items.length === 0" style="padding: 40px; background: #f8f9fa; text-align: center; border-radius: 8px; border: 1px dashed #ccc;">
      <p style="color: #666; font-size: 18px; margin-bottom: 20px;">Tu carrito está vacío en este momento.</p>
      <router-link to="/catalogo" style="background: #007bff; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Volver al Catálogo
      </router-link>
    </div>

    <div v-else>
      <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead style="background: #f1f1f1; color: #444;">
            <tr>
              <th style="padding: 15px;">Producto</th>
              <th style="padding: 15px;">Precio Unitario</th>
              <th style="padding: 15px; text-align: center;">Cantidad</th>
              <th style="padding: 15px;">Subtotal</th>
              <th style="padding: 15px; text-align: center;">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carrito.items" :key="item.id" style="border-bottom: 1px solid #eee;">
              <td style="padding: 15px; font-weight: bold; color: #333;">{{ item.nombre }}</td>
              <td style="padding: 15px; color: #666;">${{ item.precio.toFixed(2) }}</td>
              
              <td style="padding: 15px; text-align: center;">
                <div style="display: inline-flex; align-items: center; gap: 10px;">
                  <button @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)" style="padding: 5px 10px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
                  <span style="font-weight: bold; width: 20px; display: inline-block;">{{ item.cantidad }}</span>
                  <button @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)" style="padding: 5px 10px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
                </div>
              </td>
              
              <td style="padding: 15px; font-weight: bold; color: #28a745;">
                ${{ (item.precio * item.cantidad).toFixed(2) }}
              </td>
              
              <td style="padding: 15px; text-align: center;">
                <button @click="carrito.eliminarDelCarrito(item.id)" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">×</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="padding: 20px; background: #f8f9fa; display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #ddd;">
          <button @click="confirmarVaciar" style="background: #6c757d; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; cursor: pointer;">
            🗑️ Vaciar Carrito
          </button>
          <div style="text-align: right;">
            <span style="font-size: 13px; color: #666; font-weight: bold; display: block; text-transform: uppercase;">Total General:</span>
            <h2 style="margin: 0; color: #28a745; font-size: 32px; font-weight: bold;">${{ carrito.totalPrecio.toFixed(2) }}</h2>
          </div>
        </div>
      </div>

      <button @click="finalizarCompra" style="width: 100%; background: #28a745; color: white; border: none; padding: 15px; font-size: 18px; font-weight: bold; border-radius: 8px; margin-top: 20px; cursor: pointer; box-shadow: 0 4px 10px rgba(40,167,69,0.2);">
        🚀 Finalizar Compra (Simular Pedido)
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito.js'

const carrito = useCarritoStore()

const confirmarVaciar = () => {
  if (confirm('¿Seguro que deseas remover todos los productos del carrito?')) {
    carrito.vaciar()
  }
}

const finalizarCompra = () => {
  alert('🎉 ¡Pedido recibido con éxito en el sistema! Se limpiará tu carrito.')
  carrito.vaciar()
}
</script>