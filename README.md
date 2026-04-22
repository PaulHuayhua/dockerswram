# Microservicio Maestro - CRUD Alumnos

Microservicio REST con Spring Boot WebFlux y PostgreSQL, contenerizado con Docker y orquestado con Docker Swarm.

## Cómo Ejecutar

### Opción 1: Docker Compose (Desarrollo)

```bash
# 1. Construir imagen del frontend para Compose
git checkout fe
docker build -t maestro-frontend:latest .

# 2. Construir imagen del backend
git checkout be
docker build -t maestro-api:latest .

# 3. Levantar servicios
docker compose up -d

# 4. Verificar estado
docker compose ps
```

### Opción 2: Docker Swarm (Producción)

```bash
# 1. Construir imagen del frontend para Swarm
git checkout fe
docker build -f Dockerfile -t maestro-frontend:latest --build-arg NGINX_CONF=nginx-swarm.conf .

# 2. Construir imagen del backend
git checkout be
docker build -t maestro-api:latest .

# 3. Inicializar Swarm
docker swarm init

# 4. Desplegar stack
docker stack deploy -c docker-stack.yml microservice

# 5. Verificar servicios
docker service ls
docker service ps microservice_maestro-api
```

### Nota Importante

- **Docker Compose**: Usa `maestro-api:8080` (nombre del servicio)
- **Docker Swarm**: Usa `microservice_maestro-api:8080` (prefijo del stack + nombre del servicio)
- El frontend tiene dos configuraciones nginx: `nginx.conf` (Compose) y `nginx-swarm.conf` (Swarm)

### Acceder a la aplicación

- Frontend: http://localhost
- API: http://localhost:8080/api/alumnos

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

## Endpoints Disponibles

- `GET /api/health` - Estado del servicio
- `GET /api/alumnos` - Listar alumnos
- `GET /api/alumnos/{id}` - Obtener alumno por ID
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

## Detener Servicios

### Docker Compose

```bash
docker compose down
```

### Docker Swarm

```bash
docker stack rm microservice
docker swarm leave --force
```

## Arquitectura

- **maestro-api**: Spring Boot WebFlux (puerto 8080)
- **maestro-frontend**: React + Nginx (puerto 80)
- **postgres**: PostgreSQL master (puerto 5432)
- **postgres-replica**: PostgreSQL replica (puerto 5433)
