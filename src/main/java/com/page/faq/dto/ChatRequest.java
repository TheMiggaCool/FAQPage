package com.page.faq.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatRequest(
        @NotBlank(message = "El mensaje no puede estar vacío")
        @Size(max = 2000, message = "El mensaje no puede superar los 2000 caracteres")
        String mensaje
) {
}