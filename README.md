# TTT To-Do App

Aplicación fullstack de To-Do List construida con **NestJS**, **Prisma**, **Next.js** y **TypeScript**.

## 🔧 Configuración y arranque

### Prerrequisitos

* Docker & Docker Compose
* Node.js (v16+)
* Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosMonroyA/ttt-todoApp.git
cd ttt-todoApp
```

### 2. Base de datos (PostgreSQL)

```bash
docker-compose up -d
```

Levanta un contenedor PostgreSQL en el puerto **5434**.

### 3. Backend (NestJS + Prisma)

```bash
cd backend/server
cp .env.example .env    # Variables: DATABASE_URL, JWT_SECRET
npm install
npx prisma generate
npm run start:dev        # http://localhost:4000/api (Swagger UI)
```

### 4. Frontend (Next.js)

```bash
cd ../../frontend/client
cp .env.local.example .env.local  # NEXT_PUBLIC_API_URL
npm install
npm run dev               # http://localhost:3000
```

### 🧭 Recorrido completo de la aplicación

Una vez desplegado:

* 👉 Registro de usuario: `http://localhost:3000/register`
* 👉 Iniciar sesión: `http://localhost:3000/login`
* 👉 Gestión de tareas: `http://localhost:3000/tasks`

En `/tasks` puedes:

* Crear una nueva tarea
* Ver tu lista filtrada por estado
* Editar y eliminar tus tareas

---

## ⚙️ Decisiones Técnicas

* **NestJS + Prisma**: arquitectura modular y ORM ligero. Prisma simplifica migraciones y queries.
* **JWT + Passport**: autenticación segura. JWT en cabecera Bearer para proteger endpoints.
* **Swagger UI**: documentación interactiva de la API. Ya usada en mi proyecto de grado para facilidad de pruebas.
* **Next.js (App Router)**: SSR/CSR híbrido, rutas limpias y middleware.
* **React Hook Form + Yup**: validación ágil en el cliente con mensajes claros.
* **Docker Compose**: entorno reproducible de base de datos, sin instalaciones locales.

---

© 2025 TTT To-Do App
