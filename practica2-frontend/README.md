# 🛒 Tienda Online Full-Stack — Proyecto Integrador (UPTex)

Aplicación web interactiva con arquitectura desacoplada para la gestión de inventario y carrito de compras distribuido.

## 🛠️ Tecnologías Utilizadas
* **Backend:** Laravel 11, Sanctum (Tokens de Autenticación), Eloquent ORM.
* **Frontend:** Vue.js 3, Pinia (Estado Global), Vue Router, Axios.

## 🚀 Instrucciones de Instalación y Despliegue

### 1. Servidor de API (Backend)
1. Ingresa a la carpeta del servidor:
   ```bash
   cd backend
   ```

2. Instala los paquetes de PHP:
   ```bash
   composer install
   ```

3. Genera tu llave de cifrado:
   ```bash
   php artisan key:generate
   ```

4. Configura tus credenciales de base de datos en el archivo `.env`.

5. Ejecuta las migraciones:
   ```bash
   php artisan migrate
   ```

6. Crear enlace multimedia:
   ```bash
   php artisan storage:link
   ```

7. Inicia la API:
   ```bash
   php artisan serve
   ```

---

### 2. Interfaz de Usuario (Frontend)
1. Ingresa a la carpeta de la interfaz:
   ```bash
   cd frontend
   ```

2. Instala los módulos de Node:
   ```bash
   npm install
   ```

3. Arranca el entorno local reactivo:
   ```bash
   npm run dev
   ```

---

## 📦 Funcionalidades Implementadas
- Gestión de productos
- Carrito de compras
- Subida de imágenes de productos
- Autenticación con Sanctum
- Panel administrativo
- Rutas protegidas
- Arquitectura desacoplada API + SPA

---

## 👨‍💻 Autor
**Joan Castro Correa**  
Ingeniería en Sistemas Computacionales — UPTex