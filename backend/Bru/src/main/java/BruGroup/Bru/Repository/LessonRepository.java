package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Lesson;
import BruGroup.Bru.Entity.LessonIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, LessonIdentity> {
    List<Lesson> findByLessonIdentityInstructorEmail(@PathVariable String instructorEmail);
    Lesson findByLessonIdentityLessonId(@PathVariable String lessonId);
}
