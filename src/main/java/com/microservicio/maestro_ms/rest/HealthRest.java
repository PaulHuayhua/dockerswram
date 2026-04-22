package com.microservicio.maestro_ms.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthRest {

    @GetMapping("/health")
    public Mono<Map<String, String>> health() {
        return Mono.just(Map.of(
                "status", "UP",
                "service", "maestro-ms"
        ));
    }

    @GetMapping("/status")
    public Mono<Map<String, String>> status() {
        return Mono.just(Map.of(
                "status", "RUNNING",
                "message", "Microservicio funcionando correctamente"
        ));
    }
}
