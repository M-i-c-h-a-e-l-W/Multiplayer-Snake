package com.example.demo.model;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
public class CommentSearchResult {
    int length;
    List<Comment> comments;

}
