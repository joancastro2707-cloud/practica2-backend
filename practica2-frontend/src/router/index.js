import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Importamos estáticamente solo lo esencial de la raíz
import HomeView from '../views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalogo', name: 'catalogo', component: CatalogoView },

    // Nueva ruta para carrito
    { 
      path: '/carrito', 
      name: 'carrito', 
      component: () => import('../views/CartView.vue') 
    },
    
    // Ruta dinámica mapeada correctamente
    { 
      path: '/catalogo/:id', 
      name: 'producto-detalle', 
      component: () => import('../views/ProductoDetalle.vue'), 
      props: true 
    },
    
    { path: '/login', name: 'login', component: LoginView },
    
    // Rutas anidadas del panel de administración
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('../views/admin/Dashboard.vue') },
        { path: 'productos', name: 'admin-productos', component: () => import('../views/admin/Productos.vue') }
      ]
    },
    
    // Captura de rutas no definidas (404)
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
  ]
})

// Guard Global de Navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.token && !authStore.user) {
    await authStore.fetchUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  next()
})

export default router