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

## 🚀 Instalación

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
npm run docker:up
```

4. **Generar cliente de Prisma:**
```bash
npm run prisma:generate
```

5. **Ejecutar migraciones:**
```bash
npm run prisma:migrate
```

## 🎮 Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en producción
- `npm run docker:up` - Levantar PostgreSQL
- `npm run docker:down` - Detener PostgreSQL
- `npm run prisma:generate` - Generar cliente Prisma
- `npm run prisma:migrate` - Ejecutar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio

## 🔄 Cambiar de adaptador HTTP

Gracias a la arquitectura hexagonal, puedes cambiar Express por otro framework (como Hono.js) sin modificar la lógica de negocio:

1. Instala el nuevo framework
2. Crea un nuevo adaptador en `infrastructure/http/`
3. Cambia la importación en `main.ts`

## 📚 Recursos

- [Arquitectura Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)