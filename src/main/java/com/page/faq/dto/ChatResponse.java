package com.page.faq.dto;

public record ChatResponse(
        String respuesta,
        String formato
) {
    public static final String FORMATO_MARKDOWN = "markdown";

    // Constructor compacto: normaliza el texto siempre, sin importar quién cree la respuesta
    public ChatResponse {
        respuesta = normalizar(respuesta);
        formato = (formato == null || formato.isBlank()) ? FORMATO_MARKDOWN : formato;
    }

    // Fábrica de conveniencia para respuestas de la IA
    public static ChatResponse markdown(String texto) {
        return new ChatResponse(texto, FORMATO_MARKDOWN);
    }

    private static String normalizar(String texto) {
        if (texto == null) return "";

        String limpio = texto
                .replace("\r\n", "\n")
                .replace("\r", "\n")
                .strip();

        // Algunos modelos envuelven toda la respuesta en ```markdown ... ```
        if (limpio.startsWith("```")) {
            limpio = limpio
                    .replaceFirst("^```(?:markdown|md)?\\s*\\n", "")
                    .replaceFirst("\\n```$", "")
                    .strip();
        }

        // Evita más de una línea en blanco consecutiva
        return limpio.replaceAll("\\n{3,}", "\n\n");
    }
}