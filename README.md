🛒 Food Store

Tienda online de alimentos. Permite explorar un catálogo de productos, agregarlos a un carrito y visualizar el total en tiempo real.

✨ Funcionalidades

📋 Catálogo de productos con imágenes y precios
🛒 Carrito de compras dinámico
➕ Agregar y eliminar productos
💰 Cálculo automático del total

# Food Store — Backend (JPA + Hibernate + H2 + Spring Boot)

Sistema de gestión de pedidos de comida desarrollado en Java, con persistencia mediante JPA/Hibernate y base de datos H2 en archivo. Ofrece dos formas de uso: un menú de consola interactivo y una API REST (Spring Boot) consumida por el frontend.

## Tecnologías
- Java 17
- Gradle
- Hibernate / JPA
- H2 (base de datos en archivo)
- Spring Boot (capa REST, solo `spring-boot-starter-web`)
- Lombok

## Estructura del proyecto
src/main/java/com/utn/

├── entities/        → Entidades JPA (Base, Categoria, Producto, Usuario, Pedido, DetallePedido)

├── enums/           → Rol, Estado, FormaPago

├── repository/      → BaseRepository<T> + repositorios por entidad

├── util/            → JPAUtil (EntityManagerFactory)

├── api/

│   ├── controller/  → Controllers REST (@RestController)

│   ├── dto/         → DTOs de entrada/salida

│   └── config/      → Configuración CORS

├── Main.java               → Menú de consola

└── FoodStoreApiApplication.java → Punto de entrada de la API REST
## Cómo ejecutar

### Opción A: Menú de consola
Ejecutar la clase `Main.java` desde IntelliJ (o `./gradlew run` si se configura el `mainClass`).

### Opción B: API REST
Ejecutar la clase `FoodStoreApiApplication.java`. El servidor levanta en `http://localhost:8080`.

> **Importante**: la consola y la API pueden ejecutarse **al mismo tiempo**, ya que la base H2 está configurada en modo `AUTO_SERVER=TRUE` (permite múltiples conexiones concurrentes al mismo archivo).

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET/POST/PUT/DELETE | `/api/categorias` | CRUD de categorías |
| GET/POST/PUT/DELETE | `/api/productos` | CRUD de productos |
| GET | `/api/productos/categoria/{id}` | Productos de una categoría |
| GET/POST/PUT/DELETE | `/api/usuarios` | CRUD de usuarios |
| GET | `/api/usuarios/mail/{mail}` | Buscar usuario por mail |
| POST | `/api/auth/login` | Login (mail + password) |
| GET | `/api/pedidos` | Listado de todos los pedidos |
| GET | `/api/pedidos/usuario/{id}` | Pedidos de un usuario |
| GET | `/api/pedidos/estado/{estado}` | Pedidos filtrados por estado |
| POST | `/api/pedidos` | Alta de pedido (transaccional) |
| PATCH | `/api/pedidos/{id}/estado` | Cambiar estado de un pedido |
| DELETE | `/api/pedidos/{id}` | Baja lógica de un pedido |

## Notas técnicas
- Las bajas son siempre lógicas (`eliminado = true`); los registros nunca se eliminan físicamente.
- El alta de pedido es una transacción atómica: valida stock y disponibilidad, descuenta inventario, calcula subtotales y total, todo en una sola operación (rollback completo ante cualquier error).
- `hibernate.hbm2ddl.auto` está en `update`: los datos persisten entre ejecuciones.

  # Food Store — Frontend (Vite + TypeScript)

Interfaz web del sistema de gestión de pedidos de comida Food Store. Consume datos a través de la API REST del backend (Spring Boot).

## Tecnologías
- TypeScript
- Vite
- HTML5 / CSS3

## Estructura del proyecto
src/

├── types/         → Tipos TypeScript (Product, CartItem, etc.)

├── utils/

│   ├── api.ts      → Capa de conexión con el backend (fetch a la API REST)

│   └── auth.ts     → Manejo de sesión, protección de rutas, nav dinámico

└── pages/

├── auth/

│   ├── login/      → Inicio de sesión

│   └── register/   → Registro de clientes

├── store/

│   ├── home/           → Catálogo de productos

│   ├── productDetail/  → Detalle de producto

│   └── cart/            → Carrito y checkout

├── client/

│   └── orders/      → Mis pedidos

└── admin/

├── adminHome/   → Dashboard

├── categories/  → CRUD de categorías

├── products/    → CRUD de productos

└── orders/      → Gestión de pedidos

## Cómo ejecutar

```bash
npm install
npm run dev
```

Por defecto corre en `http://localhost:5173`.

> **Importante**: el backend (`FoodStoreApiApplication`) debe estar corriendo en `http://localhost:8080` para que el frontend pueda cargar datos.

## Credenciales de prueba

| Rol | Mail | Contraseña |
|---|---|---|
| USUARIO | test@test.com | 123456 |
| ADMIN | *(completar con el usuario admin que crearon)* | |

> Estas credenciales corresponden a usuarios creados manualmente desde el menú de consola del backend (sección "Usuarios"). Para generar más usuarios de prueba, usar esa misma opción.

## Notas
- La autenticación es básica (comparación de contraseña en texto plano contra la base), únicamente con fines educativos para esta etapa del proyecto.
- La sesión se guarda en `localStorage` y determina qué secciones del nav están visibles (Categorías, Productos, Pedidos y Panel Admin solo para rol ADMIN).
