package org.snake.dto;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "comments")
public class Comment {
    String text;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Override
    public String toString() {
        return "Comment{" + "text='" + text + '\'' + ", id=" + id + '}';
    }
}
