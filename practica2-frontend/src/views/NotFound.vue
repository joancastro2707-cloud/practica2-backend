<template>
  <div class="text-center mt-5 py-5">
    <h1 class="display-1 fw-bold text-danger">404</h1>
    <h2 class="fw-bold">Página No Encontrada</h2>
    <p class="text-muted lead">La ruta solicitada no existe en la aplicación de la tienda.</p>
    <router-link to="/" class="btn btn-primary mt-3 fw-bold">Volver al Inicio seguro</router-link>
  </div>
</template>

<script>
export default { name: 'NotFound' }
</script>