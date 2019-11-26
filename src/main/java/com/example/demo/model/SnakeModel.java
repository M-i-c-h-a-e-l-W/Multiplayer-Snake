package com.example.demo.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SnakeModel {
    int Score = 0;
    int[] posX;
    int[] posY;
    String direction;
    String client;
}
