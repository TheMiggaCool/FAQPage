package com.page.faq.controller;


import com.page.faq.dto.ChatRequest;
import com.page.faq.dto.ChatResponse;
import com.page.faq.services.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    // Constructor de clase
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Endpoint (? buscar qué es
    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String respuesta = chatService.procesarMensaje(request.mensaje());

        return new ChatResponse(respuesta);
    }
}
