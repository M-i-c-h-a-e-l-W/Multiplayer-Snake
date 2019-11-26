package com.example.demo.controller;

import com.example.demo.model.SnakeModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class SnakeController {
    private SnakeModel snakeModel;
    private int anzPlayer = 0;

    @GetMapping("/snake/newGame")
    public int insertPlayerIntoGame(@RequestParam String Session) {

        return ++anzPlayer;
    }

    @GetMapping("/snake/changeDirection")
    public int searchCommentWithArray(@RequestParam String changeD) {

        String[] snakeModelData = changeD.split(";");
        snakeDirection(snakeModelData[0]);

        return 0;
    }

    public boolean snakeDirection(String newDirection) {
        /*
        if (newDirection == snakeModel.getDirection()) {
            return false;
        } else if (newDirection == 'o' && snakeModel.getDirection() == 'u') {
            return false;
        } else if (newDirection == 'u' && snakeModel.getDirection() == 'o') {
            return false;
        } else if (newDirection == 'r' && snakeModel.getDirection() == 'l') {
            return false;
        } else if (newDirection == 'l' && snakeModel.getDirection() == 'r') {
            return false;
        }*/

        // Optimierung
        if (newDirection.equals(snakeModel.getDirection())) {
            return false;
        } else if (newDirection.equals("o")) {
            if (snakeModel.getDirection().equals("u")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("u")) {
            if (snakeModel.getDirection().equals("o")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("r")) {
            if (snakeModel.getDirection().equals("l")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("l")) {
            if (snakeModel.getDirection().equals("r")) {
                return false;
            } else {
                return true;
            }
        }

        System.out.println("Fatal Error in snakeDirection");
        return false;
    }
}
