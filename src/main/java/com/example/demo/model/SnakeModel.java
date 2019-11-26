package com.example.demo.model;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SnakeModel {
    int Score = 0;
    int[] posX;
    int[] posY;
    int playerNr;
    String direction;
    UUID client;
}
