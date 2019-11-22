package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.CourseLesson;
import BruGroup.Bru.Repository.CourseLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseLessonController {

    @Autowired
    CourseLessonRepository courseLessonRepository;

    @PostMapping(path = "/addCourseLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity addCourseLesson (@RequestBody CourseLesson courseLesson) {
        courseLessonRepository.save(courseLesson);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteCourseLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteCourseLesson (@RequestBody CourseLesson courseLesson) {
        courseLessonRepository.delete(courseLesson);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/getCourseLesson/{courseId}")
    @CrossOrigin(origins = "*")
    public List<CourseLesson> getCourseLesson (@PathVariable String courseId) {
        List<CourseLesson> courseLessonList = courseLessonRepository.findByCourseLessonIdentityCourseId(courseId);
        return courseLessonList;
    }
}
