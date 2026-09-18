package com.page.faq.client;

import com.google.genai.Client;
import com.google.genai.errors.ClientException;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.HttpOptions;
import org.springframework.stereotype.Component;
import com.google.genai.errors.GenAiIOException;

@Component
public class GeminiClient implements IAClient {

    private final Client client;

    // Constructor
    public GeminiClient() {
        this.client = Client.builder()
                .httpOptions(
                        HttpOptions.builder()
                                .timeout(30000)
                                .build()
                )
                .build();
    }

    /* Método para generar respuestas
    public String generarRespuesta(String mensaje) {

        System.out.println("Enviando mensaje a Gemini...");
        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.8-flash",
                        mensaje,
                        null
                );
        System.out.println("Gemini respondió jeje");

        return response.text();
    }
    */

    @Override
    public String generarRespuesta(String mensaje) {

        System.out.println("Enviando mensaje a Gemini...");

        try {

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-3.8-flash",
                            mensaje,
                            null
                    );

            System.out.println("Gemini respondió");

            return response.text();

        } catch (ClientException e) {

            System.out.println(
                    "Gemini falló: " + e.getMessage()
            );

            int statusCode = e.code();

            throw new IAException(
                    "Gemini no pudo generar una respuesta",
                    statusCode,
                    e
            );
        } catch (GenAiIOException e) {

            System.out.println(
                    "Gemini agotó el tiempo de espera."
            );

            throw new IAException(
                    "Gemini superó el timeout de 10 segundos",
                    408,
                    true,
                    e
            );
        }
    }

    // El cliente puede obtener la GEMINI_API_KEY automáticamente del entorno
}
