package com.page.faq.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Component
public class GroqClient implements IAClient {

    private final RestClient restClient;

    public GroqClient(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
    }

    @Override
    public String generarRespuesta(String mensaje) {

        System.out.println("Enviando mensaje a Groq...");

        String apiKey = System.getenv("GROQ_API_KEY");

        Map<String, Object> request = Map.of(
                "model", "openai/gpt-oss-20b",
                "messages", new Object[]{
                        Map.of(
                                "role", "user",
                                "content", mensaje
                        )
                }
        );

        try {

            Map<?, ?> response = restClient.post()
                    .uri("/chat/completions")
                    .header(
                            "Authorization",
                            "Bearer " + apiKey
                    )
                    .body(request)
                    .retrieve()
                    .body(Map.class);

            Map<?, ?> choice =
                    (Map<?, ?>) ((java.util.List<?>) response.get("choices")).get(0);

            Map<?, ?> message =
                    (Map<?, ?>) choice.get("message");

            return (String) message.get("content");

        } catch (RestClientResponseException e) {

            int statusCode = e.getStatusCode().value();

            System.out.println(
                    "Groq falló con HTTP " + statusCode
            );

            throw new IAException(
                    "Groq no pudo generar una respuesta",
                    statusCode,
                    e
            );

        } catch (RestClientException e) {

            System.out.println(
                    "Error de comunicación con Groq: " +
                            e.getMessage()
            );

            throw new IAException(
                    "Error de comunicación con Groq",
                    503,
                    e
            );
        }
    }
}