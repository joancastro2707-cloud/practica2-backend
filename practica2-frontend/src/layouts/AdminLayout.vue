<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-md-block bg-dark text-white p-3 rounded shadow-sm min-vh-50">
        <div class="position-sticky">
          <h5 class="text-center border-bottom pb-2 fw-bold text-warning">Panel Admin</h5>
          <ul class="nav flex-column gap-2 mt-3">
            <li class="nav-item">
              <router-link to="/admin" class="nav-link text-white fw-semibold" exact-active-class="bg-primary rounded px-2 py-1 d-block">
                📊 Dashboard Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/productos" class="nav-link text-white fw-semibold" exact-active-class="bg-primary rounded px-2 py-1 d-block">
                🛠️ Gestionar Productos
              </router-link>
            </li>
            <li class="nav-item mt-4 border-top pt-2">
              <router-link to="/" class="nav-link text-info fw-semibold">
                🏠 Volver a la Tienda
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="card shadow-sm p-4 border">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout'
}
</script>