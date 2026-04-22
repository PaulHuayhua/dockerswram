package com.microservicio.maestro_ms.rest;

import com.microservicio.maestro_ms.model.Alumno;
import com.microservicio.maestro_ms.service.AlumnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/api/alumnos")
@RequiredArgsConstructor
public class AlumnoRest {

    private final AlumnoService alumnoService;

    @GetMapping
    public Flux<Alumno> getAllAlumnos() {
        return alumnoService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Alumno>> getAlumnoById(@PathVariable UUID id) {
        return alumnoService.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ResponseEntity<Alumno>> createAlumno(@RequestBody Alumno alumno) {
        return alumnoService.save(alumno)
                .map(savedAlumno -> ResponseEntity.status(HttpStatus.CREATED).body(savedAlumno));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Alumno>> updateAlumno(@PathVariable UUID id, @RequestBody Alumno alumno) {
        return alumnoService.update(id, alumno)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteAlumno(@PathVariable UUID id) {
        return alumnoService.deleteById(id)
                .then(Mono.just(ResponseEntity.noContent().<Void>build()));
    }
}
