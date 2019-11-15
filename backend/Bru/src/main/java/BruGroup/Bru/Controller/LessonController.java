package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Lesson;
import BruGroup.Bru.Repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonController {

    @Autowired
    LessonRepository lessonRepository;

    @GetMapping(path = "/allLessons")
    @CrossOrigin(origins = "*")
    public List<Lesson> allLessons() {
        return lessonRepository.findAll();
    }

    @PostMapping(path = "/addLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity addLesson(@RequestBody Lesson lesson) {
        lessonRepository.save(lesson);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteLesson(@RequestBody Lesson lesson) {
        lessonRepository.delete(lesson);
        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/getInstructorLessons/{instructorEmail}")
    @CrossOrigin(origins = "*")
    public List<Lesson> getInstructorLessons(@PathVariable String instructorEmail) {
        List<Lesson> lessonList = lessonRepository.findByLessonIdentityInstructorEmail(instructorEmail);
        return lessonList;
    }
/*
    @GetMapping(path = "/getLesson/{lessonId}")
    @CrossOrigin(origins = "*")
    public List<Lesson> getInstructorLessons(@PathVariable String lessonId) {
        List<Lesson> lessonList = lessonRepository.findByLessonIdentityLessonId(instructorEmail);
        return lessonList;
    }

*/
}

/*
LessonId Clones
Get One Row
Set Name
Find Labs to one Instructor
 */