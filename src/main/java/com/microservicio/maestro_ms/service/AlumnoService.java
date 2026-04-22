package com.microservicio.maestro_ms.service;

import com.microservicio.maestro_ms.model.Alumno;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface AlumnoService {
    Flux<Alumno> findAll();
    Mono<Alumno> findById(UUID id);
    Mono<Alumno> save(Alumno alumno);
    Mono<Alumno> update(UUID id, Alumno alumno);
    Mono<Void> deleteById(UUID id);
}
