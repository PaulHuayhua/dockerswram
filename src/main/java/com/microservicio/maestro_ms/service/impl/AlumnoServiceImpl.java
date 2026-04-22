package com.microservicio.maestro_ms.service.impl;

import com.microservicio.maestro_ms.model.Alumno;
import com.microservicio.maestro_ms.repository.AlumnoRepository;
import com.microservicio.maestro_ms.service.AlumnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlumnoServiceImpl implements AlumnoService {

    private final AlumnoRepository alumnoRepository;

    @Override
    public Flux<Alumno> findAll() {
        return alumnoRepository.findAll();
    }

    @Override
    public Mono<Alumno> findById(UUID id) {
        return alumnoRepository.findById(id);
    }

    @Override
    public Mono<Alumno> save(Alumno alumno) {
        // No establecer alumnoId aquí, dejar que la BD lo genere
        if (alumno.getApoderadoId() == null) {
            alumno.setApoderadoId(UUID.randomUUID());
        }
        return alumnoRepository.save(alumno);
    }

    @Override
    public Mono<Alumno> update(UUID id, Alumno alumno) {
        return alumnoRepository.findById(id)
                .flatMap(existingAlumno -> {
                    existingAlumno.setNombre(alumno.getNombre());
                    existingAlumno.setApellidos(alumno.getApellidos());
                    existingAlumno.setCodigoMatricula(alumno.getCodigoMatricula());
                    existingAlumno.setGradoActual(alumno.getGradoActual());
                    existingAlumno.setEstado(alumno.getEstado());
                    existingAlumno.setApoderadoId(alumno.getApoderadoId());
                    return alumnoRepository.save(existingAlumno);
                });
    }

    @Override
    public Mono<Void> deleteById(UUID id) {
        return alumnoRepository.deleteById(id);
    }
}
