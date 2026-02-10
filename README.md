# Plantilla de Servidor Hexagonal

Plantilla de servidor Node.js con TypeScript, Express y arquitectura hexagonal.

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Arquitectura Hexagonal** (Ports & Adapters):
```
src/
├── domain/              # 🎯 Núcleo - Lógica de negocio pura
│   ├── entities/        # Entidades del dominio
│   ├── repositories/    # Interfaces (puertos)
│   └── use-cases/       # Casos de uso
│
├── infrastructure/      # 🔌 Adaptadores externos
│   ├── database/        # Adaptador de BD (Prisma)
│   └── http/            # Adaptador HTTP (Express)
│
└── application/         # 🎭 Orquestación
    └── services/        # Servicios de aplicación
```

## 📋 Requisitos

- Node.js >= 18
- Docker y Docker Compose
- npm o yarn

## 🚀 Instalación (Primera vez)

1. **Clonar e instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

3. **Levantar PostgreSQL con Docker:**
```bash
docker-compose up -d
```

4. **Generar cliente de Prisma:**
```bash
npm run prisma:generate
```

5. **Ejecutar migraciones:**
```bash
npm run prisma:migrate
```

6. **Iniciar el servidor:**
```bash
npm run dev
```

## 🔄 Uso diario

### Arrancar el proyecto
```bash
# 1. Levantar Docker (solo si no está corriendo)
docker-compose up -d

# 2. Iniciar el servidor
npm run dev
```

**¡Eso es todo!** Tus datos persisten entre reinicios.

### Verificar que Docker está corriendo
```bash
# Ver contenedores activos
docker ps

# Debería aparecer: hexagonal-postgres
```

## 💾 Persistencia de datos

### ✅ Los datos se mantienen (gracias a Docker volumes)

En `docker-compose.yml` hay configurado un volumen:
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
```

Esto significa que **todos los datos persisten** aunque:
- Apagues el ordenador
- Detengas el contenedor (`docker-compose down`)
- Reinicies Docker

### ✅ Las migraciones se mantienen

Los archivos en `prisma/migrations/` están en tu código y se versionan con Git.

### ✅ El cliente generado se mantiene

El código generado está en `node_modules/.prisma/client` y persiste.

### 🗑️ Solo pierdes los datos si...
```bash
# ⚠️ CUIDADO: Esto borra todos los datos
docker-compose down -v
#                    ↑ este flag borra los volúmenes
```

## 📊 Flujos de trabajo comunes

### Si cambias el schema.prisma
```bash
npm run prisma:migrate   # Crea nueva migración
npm run prisma:generate  # Actualiza el cliente TypeScript
```

### Si haces `git pull` con nuevas migraciones
```bash
npm run prisma:migrate   # Aplica las nuevas migraciones
```

### Si borras `node_modules`
```bash
npm install
npm run prisma:generate  # Regenerar el cliente de Prisma
```

### Reiniciar la base de datos (borra todos los datos)
```bash
npx prisma migrate reset
```

## 🎮 Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar en producción (requiere `build` primero)
- `npm run prisma:generate` - Generar cliente de Prisma
- `npm run prisma:migrate` - Ejecutar migraciones de base de datos
- `npm run prisma:studio` - Abrir Prisma Studio (UI visual de la BD)

## 🧪 Probar la API

### Health Check
```bash
curl http://localhost:3000/ping
```

### Crear un usuario
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","age":25}'
```

### Listar usuarios
```bash
curl http://localhost:3000/users
```

## 🎨 Ver los datos

### Prisma Studio (Recomendado)
```bash
npm run prisma:studio
```
Se abre en http://localhost:5555 con una interfaz visual.

### Terminal (psql)
```bash
docker exec -it hexagonal-postgres psql -U devuser -d hexagonal_db
```

## 🔄 Cambiar de adaptador HTTP

Gracias a la arquitectura hexagonal, puedes cambiar Express por otro framework (como Hono.js) sin modificar la lógica de negocio:

1. Instala el nuevo framework
2. Crea un nuevo adaptador en `infrastructure/http/`
3. Cambia la importación en `main.ts`:
```typescript
// Antes
const httpServer = new ExpressAdapter();

// Después
const httpServer = new HonoAdapter();
```

## 🛑 Detener el proyecto
```bash
# Detener el servidor
Ctrl + C

# Detener PostgreSQL (mantiene los datos)
docker-compose down

# Detener PostgreSQL y BORRAR todos los datos
docker-compose down -v
```

## 📚 Documentación adicional

- Ver [SETUP.md](./SETUP.md) para instrucciones detalladas de configuración
- Ver `docs/` para documentación de arquitectura y API

## 📚 Recursos

- [Arquitectura Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)