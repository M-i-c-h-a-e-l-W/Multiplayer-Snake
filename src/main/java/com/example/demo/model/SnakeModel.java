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
    int Score = 15;
    List<Integer> posX = new ArrayList<Integer>();
    List<Integer> posY = new ArrayList<Integer>();

    boolean gameRunning = false, playerAlife = true;
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

        // System.out.println("Hex Farb: " + playerColor);
    }

    // TODO bei flüssiger Bewegung alle alten Snake Körper neu setzen
    public void addPosX(int x) {
        posXHead = posX.get(posX.size() - 1) + x;

        for (int i = 1; i < posX.size(); i++) {
            // posX.set(i, posX.get(i) + x*10);
        }

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

        for (int i = 1; i < posY.size(); i++) {
            //   posY.set(i, posY.get(i) + y*10);
        }

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

    public int getLengthOfBody() {
        if (posX.size() != posY.size()) {
            return -1;
        } else return posX.size();
    }

    public boolean reduceScore() {
        for(int i = 0; i < 7; i++){
            if (Score - 1 > 0) {
                posX.remove(posX.size() - (posX.size()-1));
                posY.remove(posY.size() - (posY.size() -1));
                Score--;
            } else {
                posX.clear();
                posY.clear();
                playerAlife = false;
                Score = 0;
                return false;
            }
        }
        return true;
    }

    public void changePosX(int index, int wertX) {
        posX.set(index, posX.get(index) + wertX);
    }

    public void changePosY(int index, int wertY) {
        posY.set(index, posY.get(index) + wertY);
    }

    public boolean getPlayerAlife() {
        return playerAlife;
    }
}
