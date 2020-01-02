package com.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private String name;
    private int deaths, bestScore;
    private List<SnakeModel> snakeModels = new ArrayList<>();
}
