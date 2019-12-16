package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.CourseLesson;
import BruGroup.Bru.Entity.CourseLessonIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface
CourseLessonRepository extends JpaRepository<CourseLesson, CourseLessonIdentity> {
    List<CourseLesson> findByCourseLessonIdentityCourseIdOrderByCreateDateAsc(@PathVariable String courseId);
    List<CourseLesson> findByCourseLessonIdentityLessonId(@PathVariable int lessonId);
}
