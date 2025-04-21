package com.example.springaichat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ai.openai.OpenAiChatClient;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private OpenAiChatClient chatClient;

    @PostMapping
    public String chat(@RequestBody String input) {
        return chatClient.call(input);
    }
}
