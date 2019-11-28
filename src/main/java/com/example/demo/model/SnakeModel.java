package com.example.demo.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SnakeModel {
    int Score = 5;
    List<Integer> posX = new ArrayList<Integer>();
    List<Integer> posY = new ArrayList<Integer>();

    int playerNr;
    String direction = "r";
    UUID client;

    public void newSnake(int x, int y){
        posX.add(x);
        posY.add(y);
    }

    public void addPosX(int x) {
        posX.add(posX.get(posX.size() - 1) + x);
        if (posX.size() > Score) {
            posX.remove(posX.size() - Score-1);
        }

        //System.out.println("X: " + posX);
    }

    public void addPosY(int y) {
        posY.add(posY.get(posY.size() - 1) + y);
        if (posY.size() > Score) {
            posY.remove(posY.size() - Score-1);
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
