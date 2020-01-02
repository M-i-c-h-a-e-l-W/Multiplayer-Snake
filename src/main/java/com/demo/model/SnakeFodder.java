package com.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Random;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SnakeFodder {
    int posX = 100, posY = 100;
    boolean pause = false;

    // field size
    int canvasX = 1000, canvasY = 600;

    // generate random position on field
    public void setNewPosition() {
        posX = new Random().nextInt((canvasX - 1) % 10)*10 + 1;
        posY = new Random().nextInt((canvasY - 1) % 10)*6 + 1;
    }

    // stop and resume the game
    public void togglePause(){
        if(pause){
            pause = false;
        }else{
            pause = true;
        }
    }
}
