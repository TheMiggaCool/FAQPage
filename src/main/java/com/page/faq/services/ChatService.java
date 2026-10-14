package com.page.faq.services;

import com.page.faq.client.AIRouter;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final AIRouter aiRouter;
    private final LilaPrompt lilaPrompt;

    public ChatService(AIRouter aiRouter, LilaPrompt lilaPrompt) {
        this.aiRouter = aiRouter;
        this.lilaPrompt = lilaPrompt;
    }

    public String procesarMensaje(String mensaje) {
        return aiRouter.generarRespuesta(lilaPrompt.get(), mensaje);
    }
}