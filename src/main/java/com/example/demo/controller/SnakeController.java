package com.example.demo.controller;

import com.example.demo.model.SnakeFodder;
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
    private SnakeFodder snakeFodder = new SnakeFodder();
    private SnakeModel snakeModel = new SnakeModel();
    private int[][] Spielfeld = new int[100][60];
    private boolean[] playerAlife = new boolean[1000];
    @Autowired
    private SimpMessagingTemplate webSocket;

    private int anzPlayer = 0;
    private boolean isRunning = false;
    int kästchenGröße = 10;

    @GetMapping("/newPlayer")
    public ResponseEntity<SnakeModel> insertPlayerIntoGame() {
        SnakeModel newPlayer = new SnakeModel();

        snakeModels.add(newPlayer);
        snakeModels.get(anzPlayer).setClient(UUID.randomUUID());
        snakeModels.get(anzPlayer).setPlayerNr(anzPlayer);

        playerAlife[anzPlayer] = true;
        snakeModels.get(anzPlayer).newSnake(0, 0);
        if (anzPlayer != 0) {
            webSocket.convertAndSend("/snake/fodderOfSnake", snakeFodder);
        }

        return ResponseEntity.ok(snakeModels.get(anzPlayer++));
    }

    @GetMapping("/runGame")
    public void runGame() throws InterruptedException {
        if (isRunning) {
            return;
        }
        isRunning = true;
        snakeFodder.setNewPosition();
        webSocket.convertAndSend("/snake/fodderOfSnake", snakeFodder);

        long time;


        while (true) {
            time = System.currentTimeMillis();

            // TODO Steps flüssige Bewegung
            webSocket.convertAndSend("/snake/changeDofP", snakeModels);

            boolean exit = false;
            for (int i = 0; i < anzPlayer; i++) {

                if (!snakeModels.get(i).getPlayerAlife()) {
                    // is Dead
                } else if (snakeModels.get(i).getDirection().equals("u")) {
                    snakeModels.get(i).addPosY(1 * kästchenGröße);
                    snakeModels.get(i).addPosX(0);

                } else if (snakeModels.get(i).getDirection().equals("o")) {
                    snakeModels.get(i).addPosY(-1 * kästchenGröße);
                    snakeModels.get(i).addPosX(0);

                } else if (snakeModels.get(i).getDirection().equals("l")) {
                    snakeModels.get(i).addPosX(-1 * kästchenGröße);
                    snakeModels.get(i).addPosY(0);

                } else if (snakeModels.get(i).getDirection().equals("r")) {
                    snakeModels.get(i).addPosX(1 * kästchenGröße);
                    snakeModels.get(i).addPosY(0);
                }
            }

            for (int i = 0; i < snakeModels.size() && i >= 0; i++) {
                if (snakeModels.get(i).getPlayerAlife()) {


                    if (snakeModels.get(i).getPosXHead() == snakeFodder.getPosX() && snakeModels.get(i).getPosYHead() == snakeFodder.getPosY()) {
                        snakeModels.get(i).setScore(snakeModels.get(i).getScore() + 5);
                        snakeFodder.setNewPosition();
                        webSocket.convertAndSend("/snake/fodderOfSnake", snakeFodder);
                    }


                    for (int snakeBodyCouter = 0; snakeBodyCouter < snakeModels.size() && !exit; snakeBodyCouter++) {
                        if (snakeBodyCouter != i) {
                            for (int bodyLength = 0; bodyLength < snakeModels.get(snakeBodyCouter).getLengthOfBody(); bodyLength++) {
                                if (snakeModels.get(i).getPosXHead() == snakeModels.get(snakeBodyCouter).getPosX().get(bodyLength) &&
                                        snakeModels.get(i).getPosYHead() == snakeModels.get(snakeBodyCouter).getPosY().get(bodyLength)) {

                                    System.out.println("HITTED");

                                    if (!snakeModels.get(i).reduceScore()) {
                                        //snakeModels.remove(i);
                                        snakeModels.get(i).setPlayerAlife(false);
                                        //anzPlayer--;
                                        webSocket.convertAndSend("/snake/deleted",
                                                "{\"" + "deletedPlayer\": " + i + "}");
                                        exit = true;
                                        break;
                                    }
                                    snakeModels.get(snakeBodyCouter).setScore(snakeModels.get(snakeBodyCouter).getScore() + 4);
                                }
                            }
                        }

                    }
                    exit = false;
                }
            }
            while(snakeFodder.isPause()){
                // waiting
            }
            while (System.currentTimeMillis() <= (time + 7 * kästchenGröße)) {
                // Waiting for next Step
            }
        }
    }

    @PostMapping("/changeDirection")
    public void snakeChangeDirection(@RequestParam String changeD) {

        String[] snakeModelData = changeD.split(";");
        // snakeModels.get(Integer.parseInt(snakeModelData[1])).setDirection(snakeModelData[0]);
        if(snakeModelData[0].equals("pause")){
            snakeFodder.togglePause();
            webSocket.convertAndSend("/snake/fodderOfSnake", snakeFodder);
            return;
        }
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

    @PostMapping("/playerDead")
    public void snakePlayerDead(@RequestParam int deadPlayerNr) {
        if(snakeModels == null || snakeModels.size() == 0){
            return;
        }
        while(snakeModels.get(deadPlayerNr).getScore() != 0){
            snakeModels.get(deadPlayerNr).reduceScore();
        }
    }

    public boolean snakeDirection(String newDirection, int playerNr) {
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
