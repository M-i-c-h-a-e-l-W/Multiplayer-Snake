package com.example.demo.model;

import com.example.demo.model.SnakeModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FieldData {
    List<SnakeModel> snakeModels = new ArrayList<>();

}
