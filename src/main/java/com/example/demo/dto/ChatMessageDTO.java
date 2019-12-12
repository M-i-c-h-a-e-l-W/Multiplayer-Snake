package com.example.demo.dto;

import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {
    String newMessage;
    int playerNr;
    String playerColor;

    @Override
    public String toString() {
        return "chatMessageDTO{" + "\"playerNr\": " + playerNr +
                ",\"newMessage\": \"" + newMessage +"\"}";
    }
}
