package com.page.faq.services;

import com.page.faq.client.AIRouter;
import com.page.faq.client.GroqClient;
import com.page.faq.client.OpenRouterClient;
import com.page.faq.client.IAClient;
import com.page.faq.client.OpenRouterClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final AIRouter aiRouter;

    // Constructor de la clase
    public ChatService(AIRouter aiRouter) {
        this.aiRouter = aiRouter;
    }

    // Método para procesar mensajes
    public String procesarMensaje(String mensaje) {

        return aiRouter.generarRespuesta(mensaje);
    }
}
