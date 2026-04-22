# Frontend - Microservicio Maestro

Frontend en React para el CRUD de Alumnos.

## Desarrollo Local

```bash
cd fe
npm install
npm start
```

La aplicación se abrirá en http://localhost:3000

## Construir con Docker

```bash
cd fe
docker build -t maestro-frontend:latest .
```

## Características

- CRUD completo de Alumnos
- Interfaz responsive
- Formulario de creación y edición
- Lista con acciones de editar y eliminar
- Estados visuales con badges de colores
- Proxy a la API del backend

## Tecnologías

- React 18
- Axios para peticiones HTTP
- Nginx para servir la aplicación
- Docker multi-stage build
