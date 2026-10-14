package com.page.faq.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class LilaPrompt {

    private final String contenido;

    // Se lee una sola vez al arrancar la app
    public LilaPrompt(@Value("classpath:prompts/lila.txt") Resource recurso) throws IOException {
        this.contenido = recurso.getContentAsString(StandardCharsets.UTF_8);
    }

    public String get() {
        return contenido;
    }
}