package com.microservicio.maestro_ms.repository;

import com.microservicio.maestro_ms.model.Alumno;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.UUID;

@Repository
public interface AlumnoRepository extends R2dbcRepository<Alumno, UUID> {
    Flux<Alumno> findByCodigoMatricula(String codigoMatricula);
}
