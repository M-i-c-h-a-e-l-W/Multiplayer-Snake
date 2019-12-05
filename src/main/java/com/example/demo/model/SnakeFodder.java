package com.example.demo.model;

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
    int canvasX = 1000, canvasY = 600;
    boolean pause = false;

    public void setNewPosition() {
        posX = new Random().nextInt((canvasX - 1) % 10)*10 + 1;
        posY = new Random().nextInt((canvasY - 1) % 10)*6 + 1;
    }

    public void togglePause(){
        if(pause){
            pause = false;
        }else{
            pause = true;
        }
    }
}
