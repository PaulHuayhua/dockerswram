CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS alumnos (
    alumno_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    codigo_matricula VARCHAR(50) UNIQUE NOT NULL,
    grado_actual VARCHAR(50),
    estado VARCHAR(20) NOT NULL,
    apoderado_id UUID
);

CREATE INDEX IF NOT EXISTS idx_codigo_matricula ON alumnos(codigo_matricula);
CREATE INDEX IF NOT EXISTS idx_estado ON alumnos(estado);
