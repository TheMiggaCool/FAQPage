package com.page.faq.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Component
public class OpenRouterClient implements IAClient {

    private final RestClient restClient;

    public OpenRouterClient(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://openrouter.ai/api/v1")
                .build();
    }

    @Override
    public String generarRespuesta(String mensaje) {

        System.out.println("Enviando mensaje a OpenRouter...");

        String apiKey = System.getenv("OPENROUTER_API_KEY");
        System.out.println(
                "OPENROUTER_API_KEY presente: "
                        + (apiKey != null && !apiKey.isBlank())
        );
        Map<String, Object> request = Map.of(
                "model", "openrouter/free",
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
                    (Map<?, ?>) ((java.util.List<?>) response.get("choices"))
                            .get(0);

            Map<?, ?> message =
                    (Map<?, ?>) choice.get("message");

            System.out.println("OpenRouter respondió");

            return (String) message.get("content");

        } catch (RestClientResponseException e) {

            int statusCode = e.getStatusCode().value();

            System.out.println(
                    "OpenRouter falló con HTTP " + statusCode
            );

            throw new IAException(
                    "OpenRouter no pudo generar una respuesta",
                    statusCode,
                    e
            );

        } catch (RestClientException e) {

            System.out.println(
                    "Error de comunicación con OpenRouter: "
                            + e.getMessage()
            );

            throw new IAException(
                    "Error de comunicación con OpenRouter",
                    503,
                    e
            );
        }
    }
}