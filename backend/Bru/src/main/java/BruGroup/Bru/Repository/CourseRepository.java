package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    Course findByCourseID(@PathVariable String id);
}
