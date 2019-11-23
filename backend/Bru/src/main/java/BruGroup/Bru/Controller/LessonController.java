package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.CourseLesson;
import BruGroup.Bru.Entity.Lesson;
import BruGroup.Bru.Entity.Organization;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.CourseLessonRepository;
import BruGroup.Bru.Repository.LessonRepository;
import BruGroup.Bru.Repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class LessonController {

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    CourseLessonRepository curriculumRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    AccountRepository accountRepository;

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
        List<Lesson> lessonList = lessonRepository.findByInstructorEmail(instructorEmail);
        return lessonList;
    }

    @PostMapping(path = "/getPotentialLessons")
    @CrossOrigin(origins ="*")
    public ResponseEntity getPotentialLessons(@RequestBody PotentialLessonParameters params) {
        List<Lesson> instructorLessons = lessonRepository.findByInstructorEmail(params.getInstructorEmail());
        HashSet<Integer> courseLessonIds = getCourseLessonIds(params.getCourseId());
        List<Lesson> potentialLessons = instructorLessons
                .stream()
                .filter(lesson -> !courseLessonIds.contains(lesson.getLessonId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(potentialLessons);
    }

    @GetMapping(path = "/getLesson/{lessonId}")
    @CrossOrigin(origins = "*")
    public Lesson getLesson(@PathVariable int lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        return lesson;
    }

    @PostMapping(path = "/updateLessonName")
    @CrossOrigin(origins = "*")
    public ResponseEntity updateLessonName(@RequestBody Lesson lesson) {
        Lesson lessonId = lessonRepository.findByLessonId(lesson.getLessonId());
        lessonId.setName(lesson.getName());
        lessonRepository.save(lessonId);
        return ResponseEntity.ok(null);
    }

    public HashSet<Integer> getCourseLessonIds(String courseId) {
        HashSet<Integer> courseLessonIds = new HashSet<>();
        List<CourseLesson> courseLessons = curriculumRepository.findByCourseLessonIdentityCourseId(courseId);
        for (CourseLesson lesson: courseLessons) {
            courseLessonIds.add(lesson.getCourseLessonIdentity().getLessonId());
        }
        return courseLessonIds;
    }

}

class PotentialLessonParameters {
    private String courseId;
    private String instructorEmail;

    public PotentialLessonParameters() {

    }

    public PotentialLessonParameters(String courseId, String instructorEmail) {
        this.courseId = courseId;
        this.instructorEmail = instructorEmail;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getInstructorEmail() {
        return instructorEmail;
    }

    public void setInstructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail;
    }
}