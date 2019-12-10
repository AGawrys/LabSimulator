package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String>, JpaSpecificationExecutor<Lesson> {
    List<Lesson> findByInstructorEmail(@PathVariable String instructorEmail);
    Lesson findByLessonId(@PathVariable int lessonId);
    List<Lesson> findByNameContainingIgnoreCaseAndInstructorEmailNot(String name, String instructorEmail);
}
