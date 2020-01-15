package org.snake.repository;

import org.snake.dto.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    Optional<Comment> findById(Long id);

    List<Comment> findAll();

    //List<Comment> (Long questionId);

    List<Comment> findAllByTextContaining(String[] array);

    List<Comment> findAllByTextIsContaining(String[] array);

    List<Comment> findAllByTextContaining(String array);

    void deleteAllByTextContaining(String text);

    void deleteByText(String text);

    @Query(value = "SELECT nextval('comments_id_seq');", nativeQuery = true)
    Long getNextSeriesId();

    // List<Comment> saveAll(Iterable<Comment> iterable);

    // List<Comment> saveAll(Collection<Comment> generatedComments);

    // List<Comment> saveAll(List<Comment> generatedComments);

    // @Query(value = "SELECT * FROM comments as c where u.name LIKE '%tom%' OR name LIKE '%smith%' OR name LIKE '%larry%';",nativeQuery = true)

    // List<Comment> findByUserNameAndNotAccesdByBucketlist();
}

