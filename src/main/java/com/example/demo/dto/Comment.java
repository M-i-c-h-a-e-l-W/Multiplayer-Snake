package com.example.demo.dto;

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
// BUGGLÖSUNG IF SUCHANFRAGE 2 immer am NEde SUCHANFRAGE 1 bzw überlappend THEN Suchanfrage 1 = Suchanfrage 1+2
// FEHLER WENN Suchanfrage 2 nicht im Kommentar enthalten ist
