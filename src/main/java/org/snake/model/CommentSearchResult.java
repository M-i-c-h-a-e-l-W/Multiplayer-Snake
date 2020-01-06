package org.snake.model;

import org.snake.dto.Comment;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
public class CommentSearchResult {
    int length;
    List<Comment> comments;

}
