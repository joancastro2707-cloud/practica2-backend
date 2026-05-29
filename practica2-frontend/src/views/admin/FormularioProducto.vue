<template>
  <div style="font-family: sans-serif; max-width: 550px; margin: 30px auto; padding: 25px; border: 1px solid #ddd; border-radius: 10px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; color: #333; font-weight: bold; border-bottom: 2px solid #007bff; padding-bottom: 10px;">📦 Panel Admin — Nuevo Producto</h2>

    <div v-if="alerta.mensaje" :style="{ padding: '12px', margin: '15px 0', borderRadius: '6px', fontWeight: 'bold', color: '#fff', background: alerta.tipo === 'success' ? '#28a745' : '#dc3545' }">
      {{ alerta.mensaje }}
    </div>

    <form @submit.prevent="guardar">
      <div style="margin-bottom: 15px;">
        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Nombre del Producto *</label>
        <input v-model="form.nombre" type="text" placeholder="Ej. Lápiz Técnico" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;" />
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Descripción</label>
        <textarea v-model="form.descripcion" placeholder="Detalles del artículo..." style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; height: 80px;"></textarea>
      </div>

      <div style="display: flex; gap: 15px; margin-bottom: 15px;">
        <div style="flex: 1;">
          <label style="display: block; font-weight: bold; margin-bottom: 5px;">Precio *</label>
          <input v-model.number="form.precio" type="number" step="0.01" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;" />
        </div>
        <div style="flex: 1;">
          <label style="display: block; font-weight: bold; margin-bottom: 5px;">Stock Disponible *</label>
          <input v-model.number="form.stock" type="number" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;" />
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Imagen de Portada (JPG, PNG, WEBP)</label>
        <input type="file" accept="image/*" @change="onImageChange" style="width: 100%; padding: 5px 0;" />
        
        <div v-if="preview" style="margin-top: 15px; text-align: center; background: #f8f9fa; padding: 10px; border-radius: 8px; border: 1px dashed #bbb;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Vista previa seleccionada:</p>
          <img :src="preview" alt="Preview" style="max-height: 140px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" />
        </div>
      </div>

      <button type="submit" :disabled="cargando" style="width: 100%; background: #007bff; color: white; border: none; padding: 12px; font-size: 16px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: 0.2s;">
        <span v-if="cargando">⏳ Procesando y subiendo archivo...</span>
        <span v-else>💾 Guardar e Insertar Producto</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({ nombre: '', descripcion: '', precio: 0, stock: 0 })
const imagen = ref(null)
const preview = ref(null)
const cargando = ref(false)
const alerta = reactive({ mensaje: '', tipo: '' })

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  imagen.value = file
  preview.value = URL.createObjectURL(file) // Genera URL binaria temporal local
}

const mostrarAlerta = (msg, tipo) => {
  alerta.mensaje = msg
  alerta.tipo = tipo
  setTimeout(() => {
    alerta.mensaje = ''
  }, 4000) // Auto-cierre exigido por la rúbrica
}

const guardar = async () => {
  // Validaciones del Frontend antes de interactuar con la API
  if (!form.nombre.trim()) return mostrarAlerta('El nombre es obligatorio.', 'error')
  if (form.precio <= 0) return mostrarAlerta('El precio debe ser un número mayor a cero.', 'error')
  if (form.stock < 0) return mostrarAlerta('El inventario no puede ser negativo.', 'error')

  cargando.value = true
  
  // Construcción de objeto binario FormData
  const fd = new FormData()
  fd.append('nombre', form.nombre)
  fd.append('descripcion', form.descripcion)
  fd.append('precio', form.precio)
  fd.append('stock', form.stock)
  if (imagen.value) {
    fd.append('imagen', imagen.value)
  }

  try {
    await axios.post('/api/productos', fd, {
      headers: { 'Content-Type': 'multipart/form-data' } // Encabezado indispensable para archivos
    })
    mostrarAlerta('🎉 ¡Producto guardado y cargado al servidor correctamente!', 'success')
    
    // Resetear formulario
    form.nombre = ''
    form.descripcion = ''
    form.precio = 0
    form.stock = 0
    imagen.value = null
    preview.value = null
  } catch (error) {
    mostrarAlerta(error.response?.data?.message || 'Error interno al procesar el archivo.', 'error')
  } finally {
    cargando.value = false
  }
}
</script>