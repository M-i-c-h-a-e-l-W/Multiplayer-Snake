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

        snakeModels.get(anzPlayer).newSnake(0,0);

        return ResponseEntity.ok(snakeModels.get(anzPlayer++));
    }

    @GetMapping("/runGame")
    public void runGame() throws InterruptedException {
        while (true) {
            Thread.sleep(150);
            // TODO Step 10 not 1
            webSocket.convertAndSend("/snake/changeDofP", snakeModels);
            for (int i = 0; i < anzPlayer; i++) {
                if (snakeModels.get(i).getDirection().equals("u")) {
                    snakeModels.get(i).addPosY( 10);
                    snakeModels.get(i).addPosX( 0);

                } else if (snakeModels.get(i).getDirection().equals("o")) {
                    snakeModels.get(i).addPosY(-10);
                    snakeModels.get(i).addPosX( 0);

                } else if (snakeModels.get(i).getDirection().equals("l")) {
                    snakeModels.get(i).addPosX(-10);
                    snakeModels.get(i).addPosY( 0);

                } else if (snakeModels.get(i).getDirection().equals("r")) {
                    snakeModels.get(i).addPosX(10);
                    snakeModels.get(i).addPosY( 0);
                }
            }

        }
    }

    @PostMapping("/changeDirection")
    public void snakeChangeDirection(@RequestParam String changeD) {

        String[] snakeModelData = changeD.split(";");
        // snakeModels.get(Integer.parseInt(snakeModelData[1])).setDirection(snakeModelData[0]);

        if (snakeDirection(snakeModelData[0], Integer.parseInt(snakeModelData[1]))) {
            // System.out.println("Correct: true");
            snakeModels.get(Integer.parseInt(snakeModelData[1])).setDirection(snakeModelData[0]);

            /// Klasse SnakeModel des Spielers mit der Richtungsänderung wird an alle Clients versendet
            //webSocket.convertAndSend("/snake/changeDofP", snakeModels.get(Integer.parseInt(snakeModelData[1])));
            webSocket.convertAndSend("/snake/changeDofP", snakeModels);

        } else {
            // System.out.println("Correct: false");
        }
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
