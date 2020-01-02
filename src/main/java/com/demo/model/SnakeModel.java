package com.demo.model;

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
    int score = 15;
    // x Max = 100 & y Max = 60
    List<Integer> posX = new ArrayList<Integer>();
    List<Integer> posY = new ArrayList<Integer>();

    boolean gameRunning = false, playerAlife = true, bestPlayer = false;
    int posXHead, posYHead;
    int playerNr, playerDeaths;
    long playTime;

    String playerColor, playerName;
    String direction = "r";
    UUID client;
    int posApple;

    public void newSnake(int x, int y) {
        posX.add(x / 10);
        posY.add(y / 10);

        Random obj = new Random();
        int rand_num = obj.nextInt(0xffffff + 1);
        playerColor = String.format("#%06x", rand_num);

        // System.out.println("Hex Farb: " + playerColor);
    }

    // push Snake in next box and delete the old position
    public void addPosX(int x) {
        x /= 10;
        posXHead = posX.get(posX.size() - 1) + x;

        for (int i = 1; i < posX.size(); i++) {
            // posX.set(i, posX.get(i) + x*10);
        }

        if (posXHead > 100) {
            posXHead = 0;
        } else if (posXHead < 0) {
            posXHead = 100;
        }
        posX.add(posXHead);
        if (posX.size() > score) {
            posX.remove(posX.size() - score - 1);
        }

        //System.out.println("X: " + posX);
    }

    public void addPosY(int y) {
        y /= 10;
        posYHead = posY.get(posY.size() - 1) + y;

        for (int i = 1; i < posY.size(); i++) {
            //   posY.set(i, posY.get(i) + y*10);
        }

        if (posYHead > 60) {
            posYHead = 0;
        } else if (posYHead < 0) {
            posYHead = 60;
        }
        posY.add(posYHead);
        if (posY.size() > score) {
            posY.remove(posY.size() - score - 1);
        }

        //System.out.println("Y: " + posY);
    }

    public int getLengthOfBody() {
        if (posX.size() != posY.size()) {
            return -1;
        } else return posX.size();
    }

    public boolean reduceScore() {
        int reducingBy = (int) (posX.size() / 1.75f) + 1;
        for (int i = 0; i < reducingBy; i++) {
            if (score - 1 > 0 && posX.size() - 1 != 0 &&
                    posY.size() - 1 != 0) {
                posX.remove(posX.size() - (posX.size() - 1));
                posY.remove(posY.size() - (posY.size() - 1));
                score--;
            } else {
                posX.clear();
                posY.clear();
                playerAlife = false;
                score = 0;
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

    public void setPlayedTime(long newTime) {
        playTime += newTime;
        if(playTime % 500 == 0){
            System.out.println("Gespielte Zeit: " + playTime/1000 + "," + playTime%1000/100 + " Sekunden");
        }
    }
}
