package com.microservicio.maestro_ms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("alumnos")
public class Alumno {
    
    @Id
    private UUID alumnoId;
    private String nombre;
    private String apellidos;
    private String codigoMatricula;
    private String gradoActual;
    private EstadoAlumno estado;
    private UUID apoderadoId;
}
