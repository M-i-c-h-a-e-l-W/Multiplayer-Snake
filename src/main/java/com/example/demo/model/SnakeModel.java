package com.example.demo.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SnakeModel {
    int Score = 5;
    List<Integer> posX = new ArrayList<Integer>();
    List<Integer> posY = new ArrayList<Integer>();

    boolean gameRunning = false;
    int posXHead, posYHead;
    int playerNr;

    String playerColor;
    String direction = "r";
    UUID client;
    int posApple;

    public void newSnake(int x, int y) {
        posX.add(x);
        posY.add(y);

        Random obj = new Random();
        int rand_num = obj.nextInt(0xffffff + 1);
        playerColor = String.format("#%06x", rand_num);

        System.out.println("Hex Farb: " + playerColor);
    }

    public void addPosX(int x) {
        posXHead = posX.get(posX.size() - 1) + x;

        if (posXHead > 1000) {
            posXHead = 0;
        } else if (posXHead < 0) {
            posXHead = 1000;
        }
        posX.add(posXHead);
        if (posX.size() > Score) {
            posX.remove(posX.size() - Score - 1);
        }

        //System.out.println("X: " + posX);
    }

    public void addPosY(int y) {
        posYHead = posY.get(posY.size() - 1) + y;

        if (posYHead > 600) {
            posYHead = 0;
        } else if (posYHead < 0) {
            posYHead = 600;
        }
        posY.add(posYHead);
        if (posY.size() > Score) {
            posY.remove(posY.size() - Score - 1);
        }

        //System.out.println("Y: " + posY);
    }

    public void changePosX(int index, int wertX) {
        posX.set(index, posX.get(index) + wertX);
    }

    public void changePosY(int index, int wertY) {
        posY.set(index, posY.get(index) + wertY);
    }

}
