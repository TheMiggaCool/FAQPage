package com.page.faq.client;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class AIRouter {

    private final IAClient geminiClient;
    private final IAClient groqClient;

    public AIRouter(
            @Qualifier("geminiClient") IAClient geminiClient,
            @Qualifier("groqClient") IAClient groqClient
    ) {
        this.geminiClient = geminiClient;
        this.groqClient = groqClient;
    }

    public String generarRespuesta(String mensaje) {

        System.out.println("Intentando con Gemini...");

        try {

            return geminiClient.generarRespuesta(mensaje);

        } catch (IAException e) {

            if (!e.esRecuperable()) {
                System.out.println(
                        "Error de Gemini no recuperable."
                );

                throw e;
            }

            System.out.println(
                    "Gemini falló con un error recuperable (" +
                            e.getStatusCode() +
                            "). Intentando con Groq..."
            );

            return groqClient.generarRespuesta(mensaje);
        }
    }
}