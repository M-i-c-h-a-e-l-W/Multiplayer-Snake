package com.example.demo.service;

import com.example.demo.dto.Comment;
import com.example.demo.model.CommentSearchResult;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public CommentSearchResult searchComment(String[] suchAnfrage) {

        List<Comment> comments = commentRepository.findAll();
        List<Comment> filtered = comments.stream().filter((comment) -> {
            for (int i = 0; i < suchAnfrage.length; i++) {
                if (comment.getText().contains(suchAnfrage[i])) {
                    return true;
                }
            }
            return false;
        }).collect(Collectors.toList());

        return CommentSearchResult.builder().comments(filtered).length(comments.size()).build();
    }

    public synchronized List<Comment> generateComment() {
        Long idIndex = commentRepository.getNextSeriesId();
        List<Comment> generatedComments = new ArrayList<>();
        for (int i = 1; i < 101; i++) {
            Comment comment = new Comment("Kommentar Nr: " + (idIndex + i), null);
            generatedComments.add(comment);
        }
        List<Comment> ret = new ArrayList<>();
        commentRepository.saveAll(generatedComments).forEach(ret::add);

        return ret;
    }

    public synchronized void saveComment(Comment c) {
        c.setId(null);
        commentRepository.save(c);
    }
}
