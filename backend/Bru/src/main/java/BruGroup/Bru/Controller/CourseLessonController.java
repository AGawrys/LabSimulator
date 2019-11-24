package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Course;
import BruGroup.Bru.Entity.CourseLesson;
import BruGroup.Bru.Entity.CourseLessonIdentity;
import BruGroup.Bru.Entity.Lesson;
import BruGroup.Bru.Repository.CourseLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseLessonController {

    @Autowired
    CourseLessonRepository curriculumRepository;

    @PostMapping(path = "/addLessons")
    @CrossOrigin(origins = "*")
    public ResponseEntity addLessons (@RequestBody AddMultipleBody body) {
        String courseId = body.getParam();
        List<String> lessonIds = body.getIds();
        CourseLessonIdentity identity;
        CourseLesson lesson;

        for(String lessonId : lessonIds) {
            identity = new CourseLessonIdentity(courseId, Integer.valueOf(lessonId));
            lesson = new CourseLesson(identity);
            curriculumRepository.save(lesson);
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteCourseLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteCourseLesson (@RequestBody CourseLessonIdentity courseLessonIdentity) {
        CourseLesson courseLesson = new CourseLesson(courseLessonIdentity);
        curriculumRepository.delete(courseLesson);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/getCourseLesson/{courseId}")
    @CrossOrigin(origins = "*")
    public List<CourseLesson> getCourseLesson (@PathVariable String courseId) {
        List<CourseLesson> courseLessonList = curriculumRepository.findByCourseLessonIdentityCourseId(courseId);
        return courseLessonList;
    }
}