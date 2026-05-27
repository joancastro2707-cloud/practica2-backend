<template>
  <div class="p-5 mb-4 bg-light rounded-3 mt-4 border shadow-sm">
    <div class="container-fluid py-5 text-center">
      <h1 class="display-5 fw-bold text-primary">🛍️ Mi Tienda Online</h1>
      <p class="col-md-8 mx-auto fs-4 text-muted">
        Explora nuestros artículos de papelería e informáticos con navegación instantánea Single Page Application.
      </p>
      <div class="d-flex justify-content-center gap-3 mt-4">
        <router-link to="/catalogo" class="btn btn-primary btn-lg fw-bold">Ver Catálogo Completo</router-link>
        <router-link to="/admin" class="btn btn-outline-secondary btn-lg fw-bold">Panel de Administración</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>