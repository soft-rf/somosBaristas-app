# ☕ Somos Baristas - E-commerce de Café de Especialidad

Una aplicación web de comercio electrónico (full-stack) desarrollada para una cafetería de especialidad. Este proyecto combina un _frontend_ construido con **React** y un _backend_ robusto con **Node.js (Express)** utilizando una base de datos **SQLite**.

## 📖 Resumen General (Overview)

**Somos Baristas** es una plataforma en línea diseñada para que los entusiastas del café puedan adquirir fácilmente sus granos y productos favoritos. La aplicación ofrece una experiencia de compra fluida, desde la exploración del catálogo hasta un proceso de pago seguro y eficiente. Cuenta con una interfaz amigable y un _backend_ sólido para la gestión de productos y pedidos.

## ✨ Características Principales

- **Catálogo de Productos:** Exploración de una amplia variedad de productos de café.
- **Carrito de Compras:** Funcionalidad completa para agregar y gestionar artículos antes de la compra.
- **Proceso de Pago (Checkout):** Proceso de pago en múltiples pasos para realizar pedidos de manera estructurada.
- **Gestión de Pedidos:** El _backend_ procesa y almacena los pedidos de los clientes.
- **Autenticación de Usuarios:** Página de inicio de sesión simple para el acceso de usuarios.
- **Páginas de Estado de Pago:** Retroalimentación al usuario sobre el resultado de su transacción (éxito, fallo, pendiente).

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React**
- **Vite** (Como herramienta de _bundling_)
- **React Router** (Para la navegación)
- **CSS Modules** (Para el estilizado)

### Backend

- **Node.js**
- **Express** (Framework del servidor)
- **SQLite** (Base de datos)
- **CORS** (Para gestionar el acceso entre el _frontend_ y _backend_)

## 🌊 Flujo de Uso (Usage Flow)

1.  **Visualización de Productos**: El usuario llega a la página de inicio donde se listan todos los productos disponibles. La información de los productos se obtiene a través de una llamada a la API del backend (`GET /api/products`).
2.  **Agregar al Carrito**: El usuario puede agregar cualquier producto al carrito. El estado del carrito se gestiona globalmente en el frontend usando React Context.
3.  **Revisión del Carrito**: El usuario puede navegar a la página del carrito (`/cart`) para ver los productos seleccionados, modificar las cantidades o eliminar artículos.
4.  **Inicio de Compra**: Desde el carrito, el usuario procede a la página de pago (`/checkout`).
5.  **Formulario de Pago**: El usuario completa un formulario con su información personal (nombre, email, dirección).
6.  **Realizar Pedido**: Al confirmar la compra, se envía una solicitud `POST` al backend (`/api/orders`) con los detalles del carrito y la información del cliente.
7.  **Confirmación y Pago**: El backend guarda el pedido en la base de datos SQLite y genera un ticket HTML. El frontend muestra un mensaje de confirmación con los datos para realizar el pago mediante transferencia bancaria.
8.  **Limpieza del Carrito**: Una vez que el pedido se ha realizado con éxito, el carrito de compras se vacía.

## 🏗️ Estructura del Proyecto

El proyecto está organizado en dos carpetas principales, `front` (frontend) y `backend` (servidor):

### `backend/`

-   `controllers/`: Lógica de negocio para manejar las solicitudes (requests).
-   `routes/`: Define las rutas de la API (endpoints).
-   `services/`: Lógica para interactuar con la base de datos y otros servicios (como la generación de tickets).
-   `templates/`: Plantillas HTML (ej. para los tickets de compra).
-   `index.js`: Punto de entrada del servidor Express.
-   `somosbaristas.db`: Archivo de la base de datos SQLite.

### `front/`

-   `public/`: Archivos estáticos como imágenes y logos.
-   `src/`: Contiene todo el código fuente de la aplicación React.
    -   `components/`: Componentes reutilizables de la UI (Header, Footer, ProductItem, etc.).
    -   `context/`: Lógica para el estado global (ej. `CartContext`).
    -   `pages/`: Componentes que representan las páginas completas de la aplicación (HomePage, CartPage, CheckoutPage).
    -   `styles/`: Archivos de estilos CSS, utilizando CSS Modules para evitar colisiones de nombres.
    -   `App.jsx`: Componente principal que define las rutas de la aplicación.
    -   `main.jsx`: Punto de entrada de la aplicación React.

## 🚀 Cómo Empezar (Getting Started)

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js (v14 o superior)
-   npm (o un gestor de paquetes equivalente)

### Backend

1.  Navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor:
    ```bash
    node index.js
    ```
    El servidor del backend estará corriendo en `http://localhost:3001`.

### Frontend

1.  Abre una nueva terminal y navega a la carpeta del frontend:
    ```bash
    cd front
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación de React:
    ```bash
    npm run dev
    ```
    La aplicación del frontend estará disponible en `http://localhost:5173` (o el puerto que Vite indique).