# Microservicio Maestro - CRUD Alumnos

Microservicio REST con Spring Boot WebFlux y PostgreSQL, contenerizado con Docker y orquestado con Docker Swarm.

## Cómo Ejecutar

### 1. Inicializar Docker Swarm

```bash
docker swarm init
```

### 2. Construir las imágenes

```bash
# Backend (rama be)
docker build -t maestro-api:latest .

# Frontend (rama fe) - cambiar a la rama fe primero
git checkout fe
docker build -t maestro-frontend:latest .
git checkout be
```

### 3. Desplegar el stack

```bash
docker stack deploy -c docker-compose.yml microservice
```

### 4. Verificar servicios

```bash
docker service ls
docker service ps microservice_maestro-api
docker service ps microservice_maestro-frontend
```

### 5. Acceder a la aplicación

- Frontend: http://localhost
- API: http://localhost:8080/api

## Cómo Probar

### Health Check

```bash
curl http://localhost:8080/api/health
```

### Listar Alumnos

```bash
curl http://localhost:8080/api/alumnos
```

### Crear Alumno

```bash
curl -X POST http://localhost:8080/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "codigoMatricula": "ALU001",
    "gradoActual": "5to Primaria",
    "estado": "ACTIVO",
    "apoderadoId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Obtener Alumno por ID

```bash
curl http://localhost:8080/api/alumnos/{id}
```

### Actualizar Alumno

```bash
curl -X PUT http://localhost:8080/api/alumnos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellidos": "Pérez García",
    "codigoMatricula": "ALU001",
    "gradoActual": "6to Primaria",
    "estado": "ACTIVO",
    "apoderadoId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Eliminar Alumno

```bash
curl -X DELETE http://localhost:8080/api/alumnos/{id}
```

### Usar Postman

Importar el archivo `postman-collection.json` en Postman para probar todos los endpoints.

## Endpoints Disponibles

- `GET /api/health` - Estado del servicio
- `GET /api/status` - Estado de ejecución
- `GET /api/alumnos` - Listar alumnos
- `GET /api/alumnos/{id}` - Obtener alumno por ID
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

## Comandos Útiles

### Ver logs

```bash
docker service logs -f microservice_maestro-api
```

### Escalar servicio

```bash
docker service scale microservice_maestro-api=5
```

### Ver réplicas

```bash
docker service ps microservice_maestro-api
```

### Detener todo

```bash
docker stack rm microservice
docker swarm leave --force
```

## Arquitectura

- **maestro-frontend**: 2 réplicas del frontend React (puerto 80) - Rama `fe`
- **maestro-api**: 3 réplicas del microservicio (puerto 8080) - Rama `be`
- **postgres**: Base de datos PostgreSQL master (puerto 5432)
- **postgres-replica**: Réplica de solo lectura (puerto 5433)
- **ms-net**: Red overlay para comunicación entre servicios
- **db-data**: Volumen persistente para la base de datos

## Estructura del Repositorio

- **Rama `be`**: Backend (Spring Boot WebFlux) + Docker Compose + Documentación
- **Rama `fe`**: Frontend (React) + Dockerfile + Nginx

## Tecnologías

### Backend
- Spring Boot 3.5.13
- Spring WebFlux (Reactive)
- Spring Data R2DBC
- PostgreSQL 16
- Lombok

### Frontend
- React 18
- Axios
- Nginx
- Docker multi-stage build

### Infraestructura
- Docker Swarm
- Red overlay
- Volúmenes persistentes

