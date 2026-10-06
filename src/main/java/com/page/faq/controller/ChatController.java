package com.page.faq.controller;

import com.page.faq.dto.ChatRequest;
import com.page.faq.dto.ChatResponse;
import com.page.faq.services.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
        String respuesta = chatService.procesarMensaje(request.mensaje());
        return ChatResponse.markdown(respuesta);
    }
}