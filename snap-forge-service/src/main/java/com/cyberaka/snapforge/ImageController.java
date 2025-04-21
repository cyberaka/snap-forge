package com.cyberaka.snapforge;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/image")
public class ImageController {

    private final WebClient openAiWebClient;
    private final String openAiBaseUri = "https://api.openai.com/v1";

    public ImageController(WebClient openAiWebClient) {
        this.openAiWebClient = openAiWebClient;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> processImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("prompt") String prompt) throws URISyntaxException {

        // Currently using prompt only. You can use the image later for /images/edits
        String jsonPayload = """
                    {
                      "prompt": "%s",
                      "n": 1,
                      "size": "512x512"
                    }
                """.formatted(prompt.replace("\"", "\\\""));

        // Call DALL·E API for image generation
        String response = openAiWebClient.post()
                .uri(URI.create(openAiBaseUri + "/images/generations"))
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(jsonPayload)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return ResponseEntity.ok(response);
    }
}
