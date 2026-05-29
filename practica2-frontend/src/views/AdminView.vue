<template>
  <div style="font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh; padding: 20px;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 550px; margin: 0 auto;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
        <h2 style="color: #333; margin: 0; font-size: 24px;">⚙️ Registrar Producto</h2>
        <router-link to="/catalogo" style="color: #1a73e8; text-decoration: none; font-weight: bold; font-size: 14px;">← Ver Catálogo</router-link>
      </div>

      <div v-if="alerta.mensaje" :style="{ backgroundColor: alerta.error ? '#f8d7da' : '#d4edda', color: alerta.error ? '#721c24' : '#155724', border: alerta.error ? '1px solid #f5c6cb' : '1px solid #c3e6cb' }" style="padding: 15px; border-radius: 6px; margin-bottom: 20px; font-weight: 500;">
        {{ alerta.mensaje }}
      </div>

      <form @submit.prevent="guardar">
        <div style="margin-bottom: 18px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Nombre comercial:</label>
          <input v-model="form.nombre" type="text" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="Ej. Cuaderno Profesional" required />
        </div>

        <div style="margin-bottom: 18px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Descripción corta:</label>
          <textarea v-model="form.descripcion" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; height: 70px; box-sizing: border-box;" placeholder="Detalles del artículo..."></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 18px;">
          <div>
            <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Precio ($):</label>
            <input v-model.number="form.precio" type="number" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="0.00" required />
          </div>
          <div>
            <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Stock Inicial:</label>
            <input v-model.number="form.stock" type="number" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="0" required />
          </div>
        </div>

        <div style="margin-bottom: 25px; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #ccc;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #444;">Fotografía del Producto:</label>
          <input type="file" accept="image/*" @change="onImageChange" style="display: block; width: 100%;" />
          
          <div v-if="preview" style="margin-top: 15px; text-align: center;">
            <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Vista previa de la carga:</p>
            <img :src="preview" alt="Preview" style="max-width: 100%; height: 130px; object-fit: contain; border: 1px solid #ddd; padding: 5px; background: white; border-radius: 6px;" />
          </div>
        </div>

        <button type="submit" :disabled="enviando" style="width: 100%; padding: 12px; background-color: #1a73e8; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(26,115,232,0.2);">
          {{ enviando ? 'Procesando y Subiendo...' : 'Guardar en Base de Datos' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({ nombre: '', descripcion: '', precio: '', stock: '' })
const imagen = ref(null)
const preview = ref(null)
const enviando = ref(false)
const alerta = reactive({ mensaje: '', error: false })

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  imagen.value = file
  preview.value = URL.createObjectURL(file)
}

const guardar = async () => {
  enviando.value = true
  alerta.mensaje = ''

  const fd = new FormData()
  fd.append('nombre', form.nombre)
  fd.append('descripcion', form.descripcion || '')
  fd.append('precio', form.precio)
  fd.append('stock', form.stock)
  if (imagen.value) {
    fd.append('imagen', imagen.value)
  }

  try {
    await axios.post('/api/productos', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    alerta.mensaje = "¡Producto guardado exitosamente en el inventario!"
    alerta.error = false
    
    form.nombre = ''; form.descripcion = ''; form.precio = ''; form.stock = '';
    imagen.value = null; preview.value = null;

    setTimeout(() => { alerta.mensaje = '' }, 3500)
  } catch (error) {
    alerta.mensaje = "No se pudo conectar con el servidor de Laravel para guardar."
    alerta.error = true
  } finally {
    enviando.value = false
  }
}
</script><template>
  <div style="font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh; padding: 20px;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 550px; margin: 0 auto;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
        <h2 style="color: #333; margin: 0; font-size: 24px;">⚙️ Registrar Producto</h2>
        <router-link to="/catalogo" style="color: #1a73e8; text-decoration: none; font-weight: bold; font-size: 14px;">← Ver Catálogo</router-link>
      </div>

      <div v-if="alerta.mensaje" :style="{ backgroundColor: alerta.error ? '#f8d7da' : '#d4edda', color: alerta.error ? '#721c24' : '#155724', border: alerta.error ? '1px solid #f5c6cb' : '1px solid #c3e6cb' }" style="padding: 15px; border-radius: 6px; margin-bottom: 20px; font-weight: 500;">
        {{ alerta.mensaje }}
      </div>

      <form @submit.prevent="guardar">
        <div style="margin-bottom: 18px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Nombre comercial:</label>
          <input v-model="form.nombre" type="text" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="Ej. Cuaderno Profesional" required />
        </div>

        <div style="margin-bottom: 18px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Descripción corta:</label>
          <textarea v-model="form.descripcion" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; height: 70px; box-sizing: border-box;" placeholder="Detalles del artículo..."></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 18px;">
          <div>
            <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Precio ($):</label>
            <input v-model.number="form.precio" type="number" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="0.00" required />
          </div>
          <div>
            <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #444;">Stock Inicial:</label>
            <input v-model.number="form.stock" type="number" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" placeholder="0" required />
          </div>
        </div>

        <div style="margin-bottom: 25px; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #ccc;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #444;">Fotografía del Producto:</label>
          <input type="file" accept="image/*" @change="onImageChange" style="display: block; width: 100%;" />
          
          <div v-if="preview" style="margin-top: 15px; text-align: center;">
            <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Vista previa de la carga:</p>
            <img :src="preview" alt="Preview" style="max-width: 100%; height: 130px; object-fit: contain; border: 1px solid #ddd; padding: 5px; background: white; border-radius: 6px;" />
          </div>
        </div>

        <button type="submit" :disabled="enviando" style="width: 100%; padding: 12px; background-color: #1a73e8; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(26,115,232,0.2);">
          {{ enviando ? 'Procesando y Subiendo...' : 'Guardar en Base de Datos' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({ nombre: '', descripcion: '', precio: '', stock: '' })
const imagen = ref(null)
const preview = ref(null)
const enviando = ref(false)
const alerta = reactive({ mensaje: '', error: false })

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  imagen.value = file
  preview.value = URL.createObjectURL(file)
}

const guardar = async () => {
  enviando.value = true
  alerta.mensaje = ''

  const fd = new FormData()
  fd.append('nombre', form.nombre)
  fd.append('descripcion', form.descripcion || '')
  fd.append('precio', form.precio)
  fd.append('stock', form.stock)
  if (imagen.value) {
    fd.append('imagen', imagen.value)
  }

  try {
    await axios.post('/api/productos', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    alerta.mensaje = "¡Producto guardado exitosamente en el inventario!"
    alerta.error = false
    
    form.nombre = ''; form.descripcion = ''; form.precio = ''; form.stock = '';
    imagen.value = null; preview.value = null;

    setTimeout(() => { alerta.mensaje = '' }, 3500)
  } catch (error) {
    alerta.mensaje = "No se pudo conectar con el servidor de Laravel para guardar."
    alerta.error = true
  } finally {
    enviando.value = false
  }
}
</script>