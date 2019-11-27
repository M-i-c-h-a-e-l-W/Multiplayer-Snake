package com.example.demo.controller;

import com.example.demo.model.SnakeModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/snake")
public class SnakeController {
    private List<SnakeModel> snakeModels = new ArrayList<>();
    private SnakeModel snakeModel = new SnakeModel();
    @Autowired
    private SimpMessagingTemplate webSocket;

    private int anzPlayer = 0;

    @GetMapping("/newPlayer")
    public ResponseEntity<SnakeModel> insertPlayerIntoGame() {
        SnakeModel newPlayer = new SnakeModel();

        snakeModels.add(newPlayer);
        snakeModels.get(anzPlayer).setClient(UUID.randomUUID());
        snakeModels.get(anzPlayer).setPlayerNr(anzPlayer);

        return ResponseEntity.ok(snakeModels.get(anzPlayer++));
    }

    @PostMapping("/changeDirection")
    public void snakeChangeDirection(@RequestParam String changeD) {

        String[] snakeModelData = changeD.split(";");
        // snakeModels.get(Integer.parseInt(snakeModelData[1])).setDirection(snakeModelData[0]);

        System.out.println("Correct: " +  snakeDirection(snakeModelData[0], Integer.parseInt(snakeModelData[1])) );

        webSocket.convertAndSend("/snake/changeDirection", snakeModelData[0]);
        snakeModels.get(Integer.parseInt(snakeModelData[1])).setDirection(snakeModelData[0]);
    }

    public boolean snakeDirection(String newDirection, int playerNr) {
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
        if (newDirection.equals(snakeModels.get(playerNr).getDirection())) {
            return false;
        } else if (newDirection.equals("o")) {
            if (snakeModels.get(playerNr).getDirection().equals("u")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("u")) {
            if (snakeModels.get(playerNr).getDirection().equals("o")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("r")) {
            if (snakeModels.get(playerNr).getDirection().equals("l")) {
                return false;
            } else {
                return true;
            }
        } else if (newDirection.equals("l")) {
            if (snakeModels.get(playerNr).getDirection().equals("r")) {
                return false;
            } else {
                return true;
            }
        }

        System.out.println("Fatal Error in snakeDirection");
        return false;
    }
}
